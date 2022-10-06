//
//  NotificationService.swift
//  ImageNotification
//
//  Created by macbook pro on 06/10/2022.
//

import UIKit
import UserNotifications
import MobileCoreServices

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

  override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
      self.contentHandler = contentHandler
      bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
      if let bestAttemptContent = bestAttemptContent{
      if let fcmOptions = bestAttemptContent.userInfo["fcm_options"] as? [String: Any],
      let attachmentUrlAsString = fcmOptions["image"] as? String,
      let attachmentUrl = URL(string: attachmentUrlAsString) {
      let session = URLSession(configuration: URLSessionConfiguration.default);
      let downTask = session.downloadTask(with: attachmentUrl, completionHandler: { (URL, _, Error) in
          if Error != nil {
            print("Error")
          }else if let URL = URL{
            print("URL",URL)
            print("attachmentUrlAsString",attachmentUrlAsString)
            let attachmen = try! UNNotificationAttachment(identifier: attachmentUrlAsString, url: URL, options: [UNNotificationAttachmentOptionsTypeHintKey : kUTTypePNG])
            bestAttemptContent.attachments = [attachmen]
          }
            contentHandler(bestAttemptContent)
        })
        downTask.resume();
      }
    }
  }
    
    override func serviceExtensionTimeWillExpire() {
        // Called just before the extension will be terminated by the system.
        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }

}
