export function getNotificationsList(state) {
    state.notifications = state.notifications.filter(notification => {
        if(notification.text!==false && notification.showing!==false){
            return notification
        }
    })
    return state.notifications;
}