import type { Item } from "$lib/types";
import type { Nullable } from "$lib/types/utilities";
import type { ResponseBody } from "$lib/utils/utils";
import type { Writable } from "svelte/store";

export interface ISessionListProvider {
	currentMixId: string;
	continuation: string;
	clickTrackingParams: Nullable<string>;
	mix: Array<Item>;
	position: number;
	currentMixType: "playlist" | "auto" | "local" | null;
	visitorData: null | string;
	related?: {
		browseId: string;
		browseEndpointContextSupportedConfigs: {
			browseEndpointContextMusicConfig: {
				pageType: "MUSIC_PAGE_TYPE_TRACK_RELATED";
			};
		};
	} | null;
}

export interface ISessionListService {
	subscribe: Writable<ISessionListProvider>["subscribe"];
	set: Writable<ISessionListProvider>["set"];
	lockedSet(_mix: ISessionListProvider): Promise<ISessionListProvider>;
	/** Initialize a new automix session */
	initAutoMixSession(args: {
		videoId?: string;
		playlistId?: string;
		keyId?: number;
		playlistSetVideoId?: string;
		loggingContext?: Nullable<{ vssLoggingContext?: { serializedContextData: string } }>;
		clickTracking?: string;
		config?: { playerParams?: string; type?: string };
	}): Promise<void>;
	/** Initializes a new playlist session */
	initPlaylistSession(args: {
		playlistId: string;
		index: number;
		clickTrackingParams?: string;
		params?: string | undefined;
		videoId?: string;
		visitorData?: string;
		playlistSetVideoId?: string;
	}): Promise<{
		body: ResponseBody;
		error?: boolean | undefined;
	} | null>;

	/** Continues current automix session by fetching the next batch of songs */
	getSessionContinuation(args: {
		itct: string;
		videoId: string;
		playlistId: string;
		ctoken: string;
		clickTrackingParams: string;
		loggingContext?: { vssLoggingContext: { serializedContextData: string } };
		key: number;
	}): Promise<ResponseBody>;

	/**
	 * Fetches a set of similar songs and appends them to the current
	 * automix session
	 */
	getMoreLikeThis(args?: { playlistId?: Nullable<string> }): Promise<void>;

	/** Sets the item passed to the function to play next */
	setTrackWillPlayNext(item: Item, key: number): Promise<void>;

	setMix(mix: Item[], type?: "auto" | "playlist" | "local"): void;

	removeTrack(index: number): void;

	shuffleRandom(items: Array<Item>): void;

	shuffle(index: number, preserveBeforeActive?: boolean): void;

	toJSON(): string;

	updatePosition(direction: "next" | "back" | number): number;
	/** Getter for queue position */
	position: number;
	/** Getter for mix */
	mix: Array<Item>;
	/** Getter for currentMixId */
	currentMixId: string;
	/** Getter for clickTrackingParams */
	clickTrackingParams: string;
	/** Getter for continuation */
	continuation: string;
}
