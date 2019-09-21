module Assets exposing (elmLogoUrl)

import WebpackAsset as WA

elmLogoUrl : String
elmLogoUrl = WA.assetUrl "./static/images/elm-logo.png"
