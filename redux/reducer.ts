import { combineReducers } from "@reduxjs/toolkit";
import authGetNonceSlice from "./auth/authGetNonce/authGetNonce.slice";
import authLoginSlice from "./auth/authLogin/authLogin.slice";
import authRefreshTokenSlice from "./auth/authRefreshToken/authRefreshToken.slice";
import authRegisterSlice from "./auth/authRegister/authRegister.slice";
import bountyClaimAggregationSlice from "./bounties/bountiesClaimAggregation/bountiesClaimAggregation.slice";
import bountiesGetAllAggregatesSlice from "./bounties/bountiesGetAllAggregated/bountiesGetAllAggregated.slice";
import bountyClaimAsCollectorSlice from "./bounties/bountyClaimAsCollector/bountyClaimAsCollector.slice";
import bountyClaimedByWalletSlice from "./bounties/bountyClaimedByWallet/bountyClaimedByWallet.slice";
import bountyCollectItemSlice from "./bounties/bountyCollectItem/bountyCollectItem.slice";
import bountyCountByWalletSlice from "./bounties/bountyCountByWallet/bountyCountByWallet.slice";
import bountyGetStorerItemsSlice from "./bounties/bountyGetAllByStorer/bountyGetAllByStorer.slice";
import bountyGetBySerNumberSlice from "./bounties/bountyGetBySerNumber/bountyGetBySerNumber.slice";
import bountyHandshakeAsStorerSlice from "./bounties/bountyHandshakeAsStorer/bountyHandshakeAsStorer.slice";
import bountyReturnItemSlice from "./bounties/bountyReturnItem/bountyReturnItem.slice";
import bountyVerifyItemSlice from "./bounties/bountyVerifyItem/bountyVerifyItem.slice";
import creatorMissionNewSlice from "./creators/creatorCreateMission/creatorCreateMission.slice";
import creatorUploadImageSlice from "./creators/creatorUploadImage/creatorUploadImage.slice";
import globalSetGeolocationSlice from "./global/globalGetLocation/globalGetLocation.slice";
import globalScreenColorSlice from "./global/globalSetColor/globalScreenColor.slice";
import missionClaimSlice from "./missions/missionClaim/missionClaim.slice";
import missionGetBountyImagesSlice from "./missions/missionGetBountyImages/missionGetBountyImages.slice";
import missionGetByIdSlice from "./missions/missionGetById/missionGetById.slice";
import missionsGetByUserSlice from "./missions/missionGetByUser/missionGetByUser.slice";
import missionGetImageSlice from "./missions/missionGetImage/missionGetImage.slice";
import missionsGetInProgressSlice from "./missions/missionGetInProgress/missionGetInProgress.slice";
import missionQueryPublicSlice from "./missions/missionQueryPublic/missionQueryPublic.slice";
import missionsGetAllSlice from "./missions/missionsGetAll/missionsGetAll.slice";
import storerCheckSlice from "./storers/storerCheck/storerCheck.slice";
import storerCreateNewSlice from "./storers/storerCreateNew/storerCreateNew.slice";
import storerGetByIdSlice from "./storers/storerGetById/storerGetById.slice";
import storerGetProfileSlice from "./storers/storerGetProfile/storerGetProfile.slice";
import storerNewApplicationSlice from "./storers/storerNewApplication/storerNewApplication.slice";
import storerSearchGeolocationSlice from "./storers/storerSearchGeolocation/storerSearchGeolocation.slice";
import storerTriggerChatSlice from "./storers/storerTriggerChat/storerTriggerChat.slice";
import linkGetAllSlice from "./links/linkGetAll/linkGetAll.slice";
import createCollectorNewSlice from "./collector/registrationCollector/registrationCollector.slice";
import setNewIncidentSlice from "./collector/setIncident/setIncident.slice";
import creatorGetProfileSlice from "./creators/creatorGetProfile/creatorGetProfile.slice";
import authStorerLoginSlice from "./auth/authStorerLogin/authStorerLogin.slice";
import authCollectorLoginSlice from "./auth/authCollectorLogin/authCollectorLogin.slice";

const reducer = combineReducers({
  storerNewApplication: storerNewApplicationSlice.reducer,
  storerTriggerChat: storerTriggerChatSlice.reducer,
  authLogin: authLoginSlice.reducer,
  authStorerLogin: authStorerLoginSlice.reducer,
  authCollectorLogin: authCollectorLoginSlice.reducer,
  authRegister: authRegisterSlice.reducer,
  authGetNonce: authGetNonceSlice.reducer,
  authRefreshToken: authRefreshTokenSlice.reducer,
  creatorUploadImage: creatorUploadImageSlice.reducer,
  creatorMissionNew: creatorMissionNewSlice.reducer,
  createCollectorNew: createCollectorNewSlice.reducer,
  globalScreenColor: globalScreenColorSlice.reducer,
  globalSetGeolocation: globalSetGeolocationSlice.reducer,
  missionsGetByUser: missionsGetByUserSlice.reducer,
  missionGetById: missionGetByIdSlice.reducer,
  missionGetImage: missionGetImageSlice.reducer,
  missionsGetInProgress: missionsGetInProgressSlice.reducer,
  missionQueryPublic: missionQueryPublicSlice.reducer,
  missionClaim: missionClaimSlice.reducer,
  missionsGetAll: missionsGetAllSlice.reducer,
  missionGetBountyImages: missionGetBountyImagesSlice.reducer,
  bountyClaimAggregation: bountyClaimAggregationSlice.reducer,
  bountyClaimedByWallet: bountyClaimedByWalletSlice.reducer,
  bountyCollectItem: bountyCollectItemSlice.reducer,
  bountyClaimAsCollector: bountyClaimAsCollectorSlice.reducer,
  bountiesGetAllAggregates: bountiesGetAllAggregatesSlice.reducer,
  bountyHandshakeAsStorer: bountyHandshakeAsStorerSlice.reducer,
  bountyGetStorerItems: bountyGetStorerItemsSlice.reducer,
  bountyVerifyItem: bountyVerifyItemSlice.reducer,
  bountyReturnItem: bountyReturnItemSlice.reducer,
  bountyCountByWallet: bountyCountByWalletSlice.reducer,
  bountyGetBySerNumber: bountyGetBySerNumberSlice.reducer,
  storerCheck: storerCheckSlice.reducer,
  storerCreateNew: storerCreateNewSlice.reducer,
  storerGetProfile: storerGetProfileSlice.reducer,
  storerSearchGeolocation: storerSearchGeolocationSlice.reducer,
  storerGetById: storerGetByIdSlice.reducer,
  linkGetAll: linkGetAllSlice.reducer,
  setNewIncident: setNewIncidentSlice.reducer,
  creatorGetProfile: creatorGetProfileSlice.reducer,
});

export default reducer;
