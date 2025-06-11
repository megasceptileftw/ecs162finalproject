"use client"
import { forwardRef, useImperativeHandle, useRef } from "react"
import Lottie from "lottie-react"
import cycleData from "../animations/rps_animation.json"
// animation downloaded from https://app.lottiefiles.com/animation/8282bce9-29d2-4488-8217-b0688c141f11?channel=web&source=public-animation&from=download


//react docs:https://react.dev/reference/react/forwardRef to help with reference management
//https://react.dev/reference/react/useImperativeHandle
//https://react.dev/reference/react/useRef


const SEGMENTS = { //on the site these are the frames that correspond to each image
    rock:[0, 18],
    scissors:[19,38],
    paper:[39, 58],
}

//fn to return the Lottie render of the lottie json that corresponds to each choice (forwardRef so it will accept a reference from the parent) n i can use ref = ...
const ChoiceAnimation = forwardRef(({ choice, size = 128 }, ref) => {
    const lottieRef = useRef(null) //nned useRef so we can grab the Lottie player reference across calls (lottieRef.current is our actual player reference)

    //expose a .replay() method on the parent ref so I can call replay on each click
    useImperativeHandle(ref, () => ({ //imperative allows me to make a custom replay 'api' - this was the only way it would actually refresh properly
        replay(choice) {
            if(!choice) return

            const [start, end] = SEGMENTS[choice]
            lottieRef.current?.playSegments([start, end], true)
        }
    }), [choice])

    
    return (
        <div style={{ width:size, height:size }}>
        <Lottie
            lottieRef={lottieRef}
            animationData={cycleData}
            loop={false}
            autoplay={false}
        />
        </div>
    )
})

export default ChoiceAnimation