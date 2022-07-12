import {localNotificationService} from './../firebase/LocalNotificationService';
import {NOTIFICATION_TYPE} from './NotificationType';
import { navigationRef } from './../navigations/NavigationService';
import * as SCREEN from '../constants/ScreenTypes';
export const OnRegisterNotification=(token:any)=>{
    console.log("[App] onRegister: ", token)
}
export const  onNotification=(notify)=> {
    console.log("[App] onNotification: ", notify)
    const options = {
      soundName: 'default',
      playSound: true //,
      // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    }
    localNotificationService.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify,
      options
    )
}
export const onOpenNotification=(notify)=> {
    console.log("ON OPEN");
    
    let type:string = notify.data?.type || notify.type ;
    let data:any = notify.data.data || notify.data ;
    console.log(data);
    if(type==NOTIFICATION_TYPE.MANGA_NEW_CHAPTER){
      //console.log(notify.data.data);
      navigationRef.current?.navigate(SCREEN.DETIAL_COMIC_SCREEN,{item:data,id:data._id})
    }
}
