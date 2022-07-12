import { combineReducers } from "redux";
import _feedPostsReducer from "./_feedPostsReducer";
import getUserReducer from "./getUserReducer";
import getToggleSettingReducer from "./getToggleSettingReducer";
import _darkModeReducer from "./_darkModeReducer";
import getToggleAboutMeReducer from "./getToggleAboutMeReducer";
import getToggleBannedReducer from "./getToggleBannedReducer";
import getAllUsersReducer from "./getAllUsersReducer";
import getPostActivityReducer from "./getPostActivityReducer";
import _listFollowingsReducer from "./_listFollowingsReducer";
import _listCommentsLoadingReducer from "./_listCommentsLoadingReducer";
import getSuggestFriendsReducer from "./getSuggestFriendsReducer";
import _listHeartedPostsReducer from "./_listHeartedPostsReducer";
import _partnerReducer from "./_partnerReducer";
import _partnersCountReducer from "./_partnersCountReducer";
import _messagesCountReducer from "./_messagesCountReducer";
import _feedCategoryReducer from "./_feedCategoryReducer";
import _listUsersOnlineReducer from "./_listUsersOnlineReducer";
import _listPostCommentsReducer from "./_listPostCommentsReducer";
import _postActivityReducer from "./_postActivityReducer";
import _feedCurrentPageReducer from "./_feedCurrentPageReducer";
import _feedCurrentPositionScrollReducer from "./_feedCurrentPositionScrollReducer";
import _notifyReducer from "./_notifyReducer";
const reducers = combineReducers({
  notifyNumber: _notifyReducer,
  postComments: _listPostCommentsReducer,
  user: getUserReducer,
  usersOnline: _listUsersOnlineReducer,
  partner: _partnerReducer,
  feedCategory: _feedCategoryReducer,
  feedPosts: _feedPostsReducer,
  feedCurrentPage: _feedCurrentPageReducer,
  feedCurrentPositionScroll: _feedCurrentPositionScrollReducer,
  _partnersCount: _partnersCountReducer,
  _messagesCount: _messagesCountReducer,
  suggestFriends: getSuggestFriendsReducer,
  userFollowing: _listFollowingsReducer,
  userHearted: _listHeartedPostsReducer,
  listCommentsLoading: _listCommentsLoadingReducer,
  postActivity: _postActivityReducer,
  allUsers: getAllUsersReducer,
  toggleSetting: getToggleSettingReducer,
  toggleAboutMe: getToggleAboutMeReducer,
  toggleBanned: getToggleBannedReducer,
  darkMode: _darkModeReducer,
});

export default (state, action) => reducers(state, action);
