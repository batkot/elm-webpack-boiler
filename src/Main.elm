module Main exposing (main)

import Html exposing (text)


type ABC
    = A


main =
    function A |> text


function : ABC -> String
function =
    always "Hello world"
