module Main exposing (main)

import Html exposing (Html, text, img, div)
import Html.Attributes exposing (src, class)

import Assets exposing (elmLogoUrl)

main = div 
    [ class "elm-container" ]
    [ img [ src elmLogoUrl ] []
    , text "Elm 0.19 Webpack4 Starter" 
    ]
