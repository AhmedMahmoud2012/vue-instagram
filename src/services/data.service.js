import { hasValidCacheEntry, saveInCache, getFromCache } from "./cache.service";

import { ENDPOINT, MAX_CAPTION_LENGTH, FILTER_METHODS } from "../consts";

const minimizeCaption = (caption) => {
  const length = caption.length;
  return length > MAX_CAPTION_LENGTH
    ? `${caption.substring(0, MAX_CAPTION_LENGTH)}......`
    : caption;
};
const minimizeVideosData = (videos) => {
  const { edges } = videos;
  if (!edges) {
    throw Error("bad videos data");
  }
  return edges.map((edge) => {
    const {
      thumbnail_src: src,
      video_view_count: count,
      is_video: isVideo,
      taken_at_timestamp: time,
      edge_media_to_caption: {
        edges: [
          {
            node: { text: caption },
          },
        ],
      },
    } = edge.node;
    return { src, count, isVideo, time, caption: minimizeCaption(caption) };
  });
};

const minimizePhotosData = (photos) => {
  const { edges } = photos;
  if (!edges) {
    throw Error("bad photos data");
  }
  return edges.map((edge) => {
    const {
      thumbnail_src: src,
      edge_media_preview_like: { count },
      is_video: isVideo,
      taken_at_timestamp: time,
      edge_media_to_caption: {
        edges: [
          {
            node: { text: caption },
          },
        ],
      },
    } = edge.node;
    return { src, count, isVideo, time, caption: minimizeCaption(caption) };
  });
};
const getFeedsFromResponse = (response = {}) => {
  const {
    graphql: { user },
  } = response;
  if (!user) {
    throw Error("bad response");
  }
  const {
    edge_felix_video_timeline: videos,
    edge_owner_to_timeline_media: photos,
  } = user;

  // Cache only what you need from data...
  const minimVideos = minimizeVideosData(videos);
  const minimPhotos = minimizePhotosData(photos);
  console.log(minimVideos);

  // merge videos and photo posts and sort them
  return [...minimVideos, ...minimPhotos].sort((a, b) => b.time - a.time);
};

export const fetchData = async (username, numberOfFeeds, filter) => {
  let feeds;
  const filter_method = FILTER_METHODS[filter];
  // Cache First Strategy...
  if (hasValidCacheEntry(username)) {
    feeds = getFromCache(username);
  } else {
    let response = await fetch(ENDPOINT.replace(":username", username));
    console.log(ENDPOINT.replace(":username", username));

    response = await response.json();
    feeds = getFeedsFromResponse(response);
    saveInCache(username, feeds);
  }
  if (Number(numberOfFeeds) < feeds.length) {
    feeds = feeds.slice(numberOfFeeds);
  }
  return filter_method ? feeds.filter(filter_method) : feeds;
};
