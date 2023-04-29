import consts from "@/helpers/constants";

export async function setNotificationsList({commit}, snackbar) {
    snackbar.showing = true;
    if(snackbar.color==="green"){
        snackbar.color = consts.NOTIFICATION_BACKGROUND_GREEN
        snackbar.heading = 'Success'
        snackbar.icon = 'mdi-checkbox-marked-circle-outline'
    }
    if(snackbar.color==="#00F700"){
        snackbar.color = consts.NOTIFICATION_BACKGROUND_GREEN
        snackbar.heading = 'Change Execution process initiated'
        snackbar.icon = 'mdi-checkbox-marked-circle-outline'
    }
    else if(snackbar.color==="red"){
        snackbar.color = consts.NOTIFICATION_BACKGROUND_RED
        snackbar.heading = 'Error'
        snackbar.icon = 'mdi-alert-circle-outline'
    }
    commit('setNotifications', snackbar);      
}