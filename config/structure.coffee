# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "Inbox"
      id: "index"
      location: "hi5#index" # Supersonic module#view type navigation
    }
    {
      title: "Send"
      id: "settings"
      location: "hi5#send"
    }
    {
      title: "Users"
      id: "internet"
      location: "user#index" # URLs are supported!
    }
  ]

  # rootView:
  #   location: "example#getting-started"

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
