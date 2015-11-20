# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "Inbox"
      id: "inbox"
      location: "hi5#mailbox" # Supersonic module#view type navigation
    }
    {
      title: "Send"
      id: "send"
      location: "hi5#send"
    }
    {
      title: "Buddies"
      id: "buddies"
      location: "hi5#friendRequests" # URLs are supported!
    }
  ]

  rootView:
    location: "hi5#send"

  preloads: [

  ]

  initialView:
    id: "initialView"
    location: "login#index"

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  # initialView:
  #   id: "initialView"
  #   location: "hi5#main"
