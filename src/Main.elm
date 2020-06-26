module Main exposing (main)

import Browser

import Html exposing (Html, text, img, div)
import Html.Attributes exposing (src, class)

import Assets exposing (elmLogoUrl)

main : Program Environment Model Msg
main = 
    Browser.element
        { init = init
        , view = view
        , update = update 
        , subscriptions = always Sub.none
        }

type alias Environment = 
    { greeting : String
    }

type alias Model = 
    { greeting : String
    }

type Msg = Msg

init : Environment -> (Model, Cmd Msg)
init env = (Model env.greeting, Cmd.none)

update : Msg -> Model -> (Model, Cmd Msg)
update _ m = (m, Cmd.none)

view : Model -> Html a
view model = div 
    [ class "elm-container" ]
    [ text model.greeting
    , img [ src elmLogoUrl ] []
    , text "Elm 0.19 Webpack4 Starter" 
    ]
