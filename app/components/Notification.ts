


Notification.requestPermission(function () {
    if (Notification.permission === "granted") {

    } else {
        console.log("La permission a été refusée ou non définie !")
    }
})

const manualNotification = (body: string, icon: string, rel: string) => {
    // création d'une notification
    let notification = new Notification("Notification de la Noboté", {
        body: body,
        icon: icon
    })
    // redirection quand le click est effectué sur la notification

    notification.onclick = function () {
        window.open(rel, "_blank")
    }
}
export default manualNotification

export const a = setInterval(function () {
    const automaticNotification = () => {
        // création d'une notification
        let notification = new Notification("Notification de la Noboté", {
            body: "C'est l'heure de créer votre évenement sur Noboté",
            icon: "../assets/nobote.png"
        })
        // redirection quand le click est effectué sur la notification

        notification.onclick = function () {
            window.open("/event/new", "_blank")
        }
        // return clearInterval(a)
    }
    automaticNotification()
}, 8640)