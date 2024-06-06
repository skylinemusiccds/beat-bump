// Generated by https://quicktype.io

import type { ArtistInfo } from "$lib/types";
import type { VssLoggingContext } from "./innertube/internals";

export interface IListItemRenderer {
	subtitle: { text?: string; pageType?: string; browseId?: string }[];
	artistInfo: ArtistInfo;
	explicit: boolean;
	title: string;
	aspectRatio: string;
	playerParams?: string;
	playlistSetVideoId?: string;
	clickTrackingParams?: string;
	endpoint?: {
		browseId: string;
		pageType: string;
	};
	musicVideoType?: string;
	params?: string | undefined;
	index?: number;
	length?: string;
	videoId: string;
	playlistId: string;
	loggingContext?: { vssLoggingContext: VssLoggingContext };
	thumbnails: Array<Thumbnail>;
	type?: string;
}

interface Thumbnail {
	url: string;
	width: number;
	height: number;
	placeholder: string;
}