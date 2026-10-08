(function(root){'use strict';
  var body=root.document.body, data=root.MarketObserverRuntimePackage,tracker=root.MarketObserver;
  if(root.MarketObserverConsent)root.MarketObserverConsent.mount({locale:'ja',presentation:'quiet',containerSelector:'#analytics-consent',settingsContainerSelector:'.site-utility-links',privacyUrl:body.getAttribute('data-profile-project')==='niceskill'?'/about/#analytics':'#analytics',detailsSelector:'.analytics-privacy'});
  if(!data||!tracker)return;
  var config = { projectId: "peakheadz_brand" };
  var projectId=config.projectId;
  if(body.getAttribute('data-profile-project')!==projectId)return;
  var profile=data.profiles[projectId],hash=data.profileHashes[projectId];
  if(!profile||!hash)return;
  var route=profile.route_contracts&&profile.route_contracts[root.location.pathname];
  if(!route)return;
  // No local Measurement ID, checksum, path or alias allowlist. All come from the pinned central package.
  var result=tracker.init({projectId:projectId,measurementId:profile.measurement_id,runtimeSchema:data.runtimeSchema,runtimeSchemaHash:data.runtimeSchemaHash,profile:profile,profileHash:hash,pageContext:{route_id:route.route_id,content_type:route.content_type}});
  if(!result.ok)return;
  tracker.trackPageView();
  var sequence=0;
  root.document.addEventListener('click',function(event){
    var link=event.target.closest&&event.target.closest('a[data-mo-cta]');if(!link)return;
    var id=link.getAttribute('data-mo-cta'),group=link.getAttribute('data-mo-cta-group');
    if(!Object.prototype.hasOwnProperty.call(route.cta_destinations,id)||link.href!==route.cta_destinations[id]||profile.aliases.cta_groups.indexOf(group)<0)return;
    tracker.track('cta_click',{cta_id:id,cta_group:group,route_id:route.route_id,content_type:route.content_type},{actionToken:'profile-'+(++sequence)});
  });
})(window);
