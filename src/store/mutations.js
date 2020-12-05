import {
  FETCH_DATA,
  SET_CURRENT_USER,
  START_LOADING,
  STOP_LOADING,
  CHANGE_FILTER,
  EMPTY_FEEDS,
} from "./types";

export default {
  [FETCH_DATA](state, feeds) {
    state.feeds = feeds;
    state.currentFeedsNumber = feeds.length;
  },
  [SET_CURRENT_USER](state, username) {
    state.currentUser = username;
  },
  [START_LOADING](state) {
    state.loading = true;
  },
  [STOP_LOADING](state) {
    state.loading = false;
  },
  [CHANGE_FILTER](state, filter) {
    state.filter = filter;
  },
  [EMPTY_FEEDS](state) {
    state.feeds = [];
    state.currentFeedsNumber = null;
  },
};
