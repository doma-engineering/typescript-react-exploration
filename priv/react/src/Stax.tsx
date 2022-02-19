import { animated, config, useSpring, UseSpringProps } from "@react-spring/web";
import React, { ForwardedRef, MutableRefObject, MutableSourceSubscribe, ReactComponentElement, ReactElement, Ref, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { defBbox, SimpleDOMRect } from "./atom_bbox";

// TODO: Library
type Pt = { x: number, y: number };

interface Nothing { };
type MaybePt = Nothing | Pt;
const isNothing = (x: MaybePt): x is Nothing => Object.keys(x).length === 0;
const isJust = (x: MaybePt): x is Pt => Object.keys(x).length === 2;

const forcePush = (source: Pt, bbox: SimpleDOMRect, opts?: { force?: number, massMultiplier?: number }): UseSpringProps => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    const cmass = { x: bbox.x + (bbox.width / 2), y: bbox.y + (bbox.height / 2) }
    const massMultiplier = opts && opts.massMultiplier || 0.00075;
    const force = opts && opts.force || 100000;

    // TODO: Library
    //const distance = Math.sqrt(Math.pow((source.x - cmass.x), 2) + Math.pow((source.y - cmass.y), 2))
    const mass = massMultiplier * bbox.width * bbox.height;
    const signX = (cmass.x > source.x) ? +1 : -1;
    const accelerationX =
        (force / mass) /
        Math.max(
            signX * (bbox.width / 2),
            (cmass.x - source.x)
        );
    const signY = (cmass.y > source.y) ? +1 : -1;
    const accelerationY =
        (force / mass) /
        Math.max(
            signY * (bbox.width / 2),
            (cmass.y - source.y)
        );

    // We handwave a little bit and say that acceleration predicts how far the spring will bounce.
    // It's wrong, but the point of react-spring is to be wrong, but realistic.
    return { from: { x: 0, y: 0 }, to: { x: accelerationX, y: accelerationY } };
}

// TODO: `any` is a bug. Fix it.
// export const RelativeStax = React.forwardRef((props: { clicked: MaybePt, ref: any }, ref: ForwardedRef<MutableRefObject<null>>): React.ReactElement => {
export const RelativeStax = (props: { clicked: MaybePt, store: RecoilState<SimpleDOMRect> }): React.ReactElement => {
    const [affected, setAffected] = useState(false);
    const theSquare = (<animated.div style={{
        width: '200px',
        height: '189px',
        position: 'relative',
        left: '20%',
        top: '33%',
        backgroundColor: '#f4e736',
        boxShadow: '10px 10px 5px black'
    }}></animated.div>);
    const [bbox, _setBbox] = useRecoilState(props.store);
    const springSpecMaybe = () => {
        if (isJust(props.clicked) && props.store) {
            const theX = 0.01 * parseFloat(theSquare.props.style.left) * bbox.width;
            const theY = 0.01 * parseFloat(theSquare.props.style.top) * bbox.height;
            const theWidth = parseFloat(theSquare.props.style.width);
            const theHeight = parseFloat(theSquare.props.style.height);
            const theBbox = { width: theWidth, height: theHeight, x: theX, y: theY }
            return forcePush(props.clicked, theBbox);
        } else {
            return {};
        }
    }
    console.log({ ...springSpecMaybe(), config: config.wobbly });
    const spring = useSpring({ ...springSpecMaybe(), config: config.wobbly });
    console.log(spring);
    return <theSquare.type style={{ ...theSquare.props.style, ...spring }} />;
};


export const TopStax = (props: { children: React.ReactElement, store: RecoilState<SimpleDOMRect> }) => {
    const [clicked, setClicked] = useState(mkPtMaybe(null));
    const [_bbox, setBbox] = useRecoilState(props.store);
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        setBbox(ref.current && ref.current.getBoundingClientRect() || defBbox);
    }, [])

    return (
        <div
            ref={ref}
            style={{ width: '100vw', height: '100vh', backgroundColor: '#700731' }}
            onMouseDown={(e) => {
                setClicked(mkPtMaybe({ x: e.clientX, y: e.clientY }));
            }}
        >
            {React.cloneElement(props.children, { clicked, store: props.store })}
        </div>
    );
};

const mkPtMaybe = (pt: null | Pt) => {
    if (!pt) {
        return {};
    } else {
        return pt;
    }
}
