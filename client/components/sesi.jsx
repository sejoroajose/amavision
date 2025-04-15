import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

const AnimatedSVG = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path')

    if (paths && paths.length > 0) {
      gsap.fromTo(
        paths,
        { drawSVG: '0%' }, 
        {
          drawSVG: '100%', 
          duration: 5, 
          stagger: 0.2, 
          ease: 'power1.inOut', 
        }
      )
    } else {
      console.error('No paths found inside the SVG.')
    }
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g
        transform="translate(0.000000,329.000000) scale(0.100000,-0.100000)"
        fill="#DBE7E8"
        stroke="none"
      >
        <path
          d="M1483 3049 c-118 -19 -209 -69 -316 -173 -108 -106 -149 -210 -148
-385 0 -57 3 -106 6 -109 12 -12 65 -8 65 4 0 7 25 20 55 29 32 9 53 20 49 26
-9 15 63 5 110 -15 21 -9 57 -18 80 -21 48 -6 73 -25 33 -25 -20 0 -27 -5 -27
-20 0 -25 -11 -25 -44 1 -14 11 -42 25 -62 31 -40 10 -114 2 -114 -14 0 -5 9
-6 23 -2 42 14 95 6 136 -22 23 -15 41 -28 41 -30 0 -6 -34 8 -55 23 -11 7
-41 13 -67 13 -46 0 -48 -1 -36 -20 14 -22 64 -28 71 -7 3 9 8 9 21 -3 35 -28
96 -18 96 16 0 13 15 15 100 12 79 -2 100 0 100 11 0 9 -8 11 -27 6 -22 -5
-25 -4 -16 5 6 7 33 14 60 17 26 3 67 11 91 19 65 21 93 18 118 -13 17 -21 25
-25 34 -17 18 17 -54 73 -89 69 -29 -4 -121 -17 -136 -20 -5 -1 -14 -3 -20 -4
-5 -1 -3 -6 5 -12 15 -11 13 -11 -40 2 -8 2 -14 -1 -13 -6 1 -6 -16 -17 -37
-26 -31 -14 -43 -14 -62 -5 -12 7 -22 20 -21 30 1 15 -4 17 -29 12 -21 -4 -37
0 -55 13 -13 11 -31 17 -39 14 -8 -3 -14 0 -14 5 0 11 -101 15 -132 6 -10 -3
-18 -11 -18 -18 0 -10 -79 -46 -100 -46 -3 0 -6 33 -5 74 0 41 3 72 7 69 5 -2
4 7 -2 21 -6 17 -6 35 0 51 5 14 7 32 4 40 -4 8 -1 15 5 15 6 0 11 -5 11 -12
0 -6 3 -9 6 -6 3 4 1 16 -6 27 -9 17 -8 22 5 27 9 4 15 14 13 23 -1 9 5 27 14
39 15 22 17 22 21 5 4 -17 5 -17 6 1 2 36 93 142 111 131 6 -3 15 6 20 20 5
14 14 24 18 21 5 -3 16 4 26 16 12 14 26 19 46 16 21 -3 27 -1 22 11 -4 9 -1
12 7 7 7 -5 18 0 26 10 13 18 14 18 15 2 0 -10 4 -18 10 -18 5 0 7 7 3 16 -5
13 -2 15 17 9 16 -5 20 -4 15 4 -14 23 116 10 175 -17 70 -32 162 -101 153
-116 -3 -6 -2 -8 2 -3 5 4 24 -14 42 -40 19 -27 43 -51 54 -55 10 -4 24 -20
29 -35 20 -53 21 -58 20 -62 -1 -2 3 -7 9 -10 12 -8 31 -97 23 -106 -3 -3 -6
-27 -7 -53 -1 -26 -6 -77 -10 -114 -7 -59 -6 -68 8 -68 23 0 25 6 38 108 10
76 9 104 -4 175 -18 96 -35 125 -138 240 -132 145 -258 206 -386 186z"
        />
        <path
          d="M1688 2374 c-26 -8 -50 -19 -54 -25 -4 -7 -1 -9 7 -6 52 21 92 29
122 23 38 -7 56 -23 62 -54 6 -35 -18 -45 -97 -38 -57 5 -69 3 -60 -6 7 -7 42
-14 77 -15 55 -2 66 1 79 19 10 14 21 19 36 15 19 -5 21 -2 15 25 l-7 31 42
-7 c24 -4 39 -3 36 3 -3 5 -22 11 -41 13 -31 4 -36 1 -42 -20 l-6 -24 -16 26
c-8 14 -32 32 -53 41 -45 18 -40 18 -100 -1z"
        />
        <path
          d="M1128 2358 c-4 -29 -29 -34 -70 -14 -38 20 -38 20 -38 0 0 -16 29
-52 31 -37 0 4 5 -3 12 -17 l11 -25 3 26 c3 21 10 27 31 27 15 1 41 2 59 2 24
1 30 5 26 16 -3 9 -12 12 -25 8 -13 -4 -18 -2 -14 4 3 5 -1 15 -8 21 -12 10
-15 8 -18 -11z"
        />
        <path
          d="M1653 2329 c-24 -11 -43 -24 -43 -29 0 -13 17 -13 25 0 4 6 11 8 16
5 5 -4 16 1 25 9 20 20 34 20 34 1 0 -9 9 -15 24 -15 13 0 26 7 30 15 3 8 10
15 16 15 5 0 10 -7 10 -15 0 -17 16 -20 25 -6 7 12 -9 22 -51 31 -28 7 -34 5
-34 -9 -1 -14 -2 -14 -11 2 -12 21 -13 20 -66 -4z"
        />
        <path
          d="M956 2328 c-13 -40 -15 -92 -6 -162 10 -83 33 -134 66 -151 13 -7 20
-22 22 -50 4 -61 23 -136 44 -178 l19 -38 -32 -37 c-94 -108 -153 -165 -187
-178 -45 -19 -210 -103 -372 -190 -14 -7 -97 -48 -184 -91 -256 -125 -241
-109 -242 -248 -1 -57 -4 -115 -8 -130 -4 -16 0 -41 13 -69 20 -47 17 -75 -23
-184 -9 -24 -15 -53 -15 -65 2 -33 -18 -148 -30 -181 -7 -16 -9 -31 -6 -34 3
-3 5 -3 5 0 0 3 14 -7 31 -23 17 -16 35 -26 40 -23 12 7 105 -23 145 -47 39
-23 51 -24 33 -2 -18 21 -86 51 -135 59 -55 9 -95 34 -92 59 2 13 9 19 20 17
15 -2 16 1 8 23 -28 74 -4 71 49 -5 23 -33 44 -60 46 -60 9 0 -11 38 -47 89
-31 44 -38 63 -38 101 0 28 6 52 14 59 7 6 11 22 9 35 -3 13 0 27 6 30 6 4 11
23 11 42 0 19 5 34 10 34 6 0 10 5 10 11 0 5 -4 7 -10 4 -6 -4 -7 2 -1 17 9
24 -5 68 -21 68 -11 0 0 82 12 90 5 3 4 27 -1 54 -5 27 -6 65 -3 86 7 41 58
104 79 96 7 -2 22 4 33 14 11 10 23 16 26 13 3 -4 14 1 23 9 10 8 45 28 78 44
33 16 75 39 94 51 24 16 37 20 42 12 5 -8 8 -8 13 0 4 6 12 8 18 5 6 -4 8 -3
5 3 -3 5 9 16 28 23 19 8 35 17 35 22 0 4 7 8 15 8 15 0 55 19 65 31 3 3 25
16 50 30 25 13 51 30 59 37 8 7 24 11 35 8 14 -3 30 3 47 18 13 12 30 21 37
18 6 -2 12 1 12 7 0 6 5 11 11 11 11 0 27 13 85 68 15 14 24 18 24 10 0 -9 3
-9 10 2 7 11 10 6 10 -20 1 -46 5 -81 13 -100 3 -8 11 -33 18 -55 6 -22 18
-47 25 -56 8 -9 11 -19 7 -22 -3 -4 -2 -17 4 -30 17 -35 30 -71 31 -81 0 -5 4
-12 9 -15 17 -11 43 -79 37 -95 -3 -9 -1 -16 5 -16 7 0 14 -8 17 -17 4 -10 26
-67 49 -128 37 -92 56 -150 70 -210 1 -5 5 -17 8 -25 8 -20 57 -162 61 -175
16 -59 39 -134 45 -150 5 -11 14 -33 20 -48 6 -15 11 -37 11 -48 0 -11 6 -22
14 -25 8 -3 19 -26 26 -52 15 -63 51 -142 61 -136 5 3 3 15 -5 27 -15 25 -39
117 -32 124 10 10 26 -9 26 -32 0 -13 5 -27 11 -31 9 -5 10 3 5 28 l-6 35 42
1 c56 2 198 24 198 32 0 7 -199 -7 -248 -19 l-38 -8 -43 136 c-116 370 -177
550 -237 696 -122 299 -163 411 -170 462 -7 54 2 143 14 143 4 0 16 -19 27
-42 28 -57 126 -138 263 -216 123 -71 173 -87 208 -69 43 23 157 131 200 190
34 46 44 68 44 98 0 21 -4 41 -10 44 -5 3 -7 0 -4 -8 10 -27 -60 -127 -88
-127 -5 0 -8 -6 -6 -12 3 -16 -48 -68 -58 -59 -4 3 -4 1 -1 -6 8 -13 -77 -87
-111 -96 -12 -3 -20 -1 -16 4 3 5 -5 9 -18 9 -27 1 -131 64 -121 74 4 4 0 4
-8 1 -9 -3 -27 5 -42 19 -15 14 -31 25 -35 25 -7 0 -117 95 -134 116 -24 30
-42 49 -34 38 5 -8 7 -16 4 -18 -3 -3 -11 6 -18 20 -7 14 -17 25 -22 25 -4 0
-8 5 -8 11 0 5 4 7 10 4 16 -10 5 45 -19 100 -13 28 -24 59 -26 70 -4 20 -11
65 -21 123 -3 18 -9 30 -15 27 -5 -4 -9 -1 -9 5 0 6 -5 8 -10 5 -10 -6 -35 44
-26 53 3 2 -4 16 -15 30 -17 22 -18 28 -6 46 15 22 45 38 32 16 -4 -7 -2 -16
6 -21 8 -4 14 -22 15 -39 1 -17 5 -34 9 -38 4 -4 4 16 1 43 -3 28 -6 62 -6 76
0 15 -7 43 -15 62 -8 20 -14 42 -13 49 4 17 -41 23 -46 6z m42 -64 c12 7 25
-21 16 -35 -3 -6 -11 -5 -20 2 -11 9 -14 8 -14 -5 0 -9 -4 -16 -10 -16 -11 0
-14 53 -3 63 4 4 10 2 14 -4 4 -6 11 -9 17 -5z"
        />
        <path
          d="M1399 2309 c-36 -37 -30 -53 6 -19 20 19 28 21 37 12 10 -10 8 -14
-10 -19 -19 -4 -22 -11 -18 -29 5 -19 3 -22 -11 -17 -19 7 -18 5 11 -17 11 -8
17 -10 13 -4 -4 7 6 28 22 48 53 67 10 106 -50 45z"
        />
        <path
          d="M1512 2330 c-16 -12 -10 -30 24 -64 40 -40 44 -42 44 -21 0 8 -9 20
-20 27 -25 16 -26 28 -2 28 17 0 42 18 42 30 0 7 -78 8 -88 0z"
        />
        <path
          d="M1967 2313 c-4 -3 -7 -45 -7 -92 0 -68 2 -82 13 -72 7 7 12 41 12 91
0 76 -3 89 -18 73z"
        />
        <path
          d="M2010 2291 c-14 -28 -12 -47 7 -62 15 -12 16 -12 10 3 -3 10 -2 20 3
23 6 4 10 -11 10 -34 0 -30 -4 -41 -15 -41 -8 0 -15 5 -15 12 0 6 -2 9 -5 6
-3 -3 -1 -18 5 -34 13 -34 5 -74 -15 -74 -8 0 -15 -7 -15 -16 0 -8 -5 -12 -10
-9 -6 4 -13 -8 -17 -25 -3 -17 -16 -38 -29 -46 -13 -9 -20 -22 -17 -30 3 -8 1
-14 -5 -14 -5 0 -9 -17 -10 -37 0 -37 -40 -132 -68 -164 -12 -14 -12 -19 5
-37 17 -21 43 -112 55 -197 12 -84 26 -457 32 -861 3 -232 7 -430 9 -440 2
-11 5 -44 6 -74 1 -38 3 -45 6 -22 2 17 7 32 11 32 4 0 7 64 6 142 -1 79 -3
302 -4 496 -1 193 -5 352 -9 352 -3 0 -6 46 -6 102 -1 57 -4 135 -8 173 -4 39
-10 91 -12 116 -2 25 -8 54 -11 64 -9 21 2 17 57 -26 21 -17 43 -26 55 -23 24
6 127 -30 116 -41 -4 -4 6 -5 21 -1 19 4 26 3 22 -4 -3 -5 0 -10 7 -10 20 0
68 -24 68 -33 0 -5 5 -5 11 -2 6 4 17 -1 24 -11 9 -12 14 -14 15 -6 0 8 9 6
28 -8 15 -12 70 -31 120 -44 51 -12 89 -26 85 -30 -4 -4 4 -5 18 -3 13 3 33
-1 44 -9 10 -8 27 -14 38 -14 10 0 35 -7 54 -17 l35 -16 -4 -220 c-4 -255 7
-235 18 31 6 167 14 211 28 165 3 -10 6 -45 7 -78 2 -80 10 -136 19 -130 4 2
7 -9 8 -26 0 -17 8 -36 16 -42 9 -7 18 -25 20 -42 2 -16 13 -48 24 -70 12 -22
26 -71 32 -110 6 -38 15 -72 20 -75 5 -3 8 -25 7 -50 -2 -25 3 -51 10 -58 7
-7 13 -23 13 -34 0 -25 29 -88 41 -88 10 0 2 70 -13 109 -5 14 -17 68 -27 121
-11 52 -31 129 -45 170 -15 41 -36 106 -46 144 -11 38 -27 77 -35 86 -10 11
-15 38 -16 81 0 90 -16 131 -54 141 -16 4 -75 22 -130 41 -55 18 -134 42 -175
52 -41 10 -86 26 -99 37 -13 10 -30 18 -38 18 -7 0 -40 13 -73 30 -32 16 -101
43 -153 60 -94 30 -123 46 -184 104 -41 37 -41 54 -3 134 16 35 35 92 41 127
7 42 16 65 24 65 31 0 115 198 115 269 0 47 -40 69 -60 32z"
        />
        <path
          d="M1160 2294 c0 -4 8 -13 18 -20 21 -17 75 -16 127 1 l40 13 -70 -1
c-38 0 -80 3 -92 7 -13 4 -23 4 -23 0z"
        />
        <path
          d="M1580 2289 c0 -12 29 -38 43 -39 4 0 0 11 -10 25 -19 26 -33 32 -33
14z"
        />
        <path
          d="M1080 2236 c0 -5 15 -21 33 -37 30 -27 38 -29 107 -27 l75 1 -65 7
c-74 7 -96 15 -127 43 -13 11 -23 17 -23 13z"
        />
        <path
          d="M1264 2228 c-3 -4 -12 -5 -22 -2 -13 5 -14 4 -3 -4 11 -8 10 -11 -5
-15 -16 -4 -15 -5 4 -6 12 0 25 6 29 15 4 10 8 12 13 4 7 -11 40 -4 40 9 0 8
-51 8 -56 -1z"
        />
        <path
          d="M1507 2233 c-3 -3 5 -16 19 -28 14 -13 25 -32 24 -42 -6 -102 -7
-107 -31 -115 -37 -14 -71 -2 -64 22 4 12 2 20 -4 20 -6 0 -11 5 -11 11 0 6 7
9 15 5 18 -7 18 -4 4 28 -8 16 -17 22 -27 18 -11 -4 -14 -1 -9 11 15 39 -61 8
-115 -48 -29 -29 -35 -45 -18 -45 6 0 10 5 10 10 0 22 22 8 31 -20 6 -16 12
-30 13 -30 0 0 16 4 34 9 27 8 39 6 65 -9 37 -23 62 -25 97 -7 14 7 44 11 68
9 42 -4 42 -4 42 28 0 24 -3 30 -12 23 -7 -5 -31 -11 -52 -12 -33 -2 -38 0
-32 14 3 9 6 25 6 35 0 18 36 35 45 20 3 -4 19 -13 35 -19 l31 -10 -23 29
c-13 16 -29 29 -36 29 -22 1 -72 34 -72 47 0 13 -25 26 -33 17z m-87 -96 c8
-7 15 -24 15 -39 1 -27 -2 -28 -46 -28 -61 0 -84 23 -48 48 23 17 49 30 59 31
3 0 12 -5 20 -12z"
        />
        <path
          d="M1651 2224 c22 -27 67 -44 111 -43 30 2 35 3 15 6 -15 2 -25 9 -22
14 4 5 -5 9 -20 9 -14 0 -42 7 -62 15 -32 14 -34 14 -22 -1z"
        />
        <path
          d="M1905 2218 c-5 -13 -25 -30 -42 -38 -35 -16 -43 -30 -17 -30 22 0 76
57 72 76 -2 11 -6 9 -13 -8z"
        />
        <path
          d="M1395 1974 c-19 -15 -18 -15 14 -10 18 2 38 9 44 15 18 18 -35 13
-58 -5z"
        />
        <path
          d="M1563 1983 c-7 -3 -13 -8 -13 -13 0 -10 49 -20 55 -11 6 10 -28 29
-42 24z"
        />
        <path
          d="M1518 1910 c-3 -11 -21 -14 -84 -12 -77 3 -178 -19 -144 -31 41 -15
69 -16 73 -4 2 8 33 13 98 14 138 4 139 4 157 -7 14 -8 12 -9 -11 -10 -17 0
-26 -4 -22 -10 4 -6 15 -8 25 -5 10 3 28 8 39 10 42 8 59 35 22 35 -11 0 -22
4 -25 9 -3 4 -30 7 -61 6 -32 -1 -56 3 -58 9 -2 6 -6 4 -9 -4z"
        />
        <path d="M1484 1828 c-2 -4 -1 -9 4 -12 11 -7 52 4 52 14 0 10 -50 8 -56 -2z" />
        <path
          d="M1573 1802 c-36 -17 -46 -43 -14 -35 20 5 57 40 50 47 -2 2 -19 -3
-36 -12z"
        />
        <path
          d="M1310 1790 c0 -5 4 -10 9 -10 5 0 13 -9 16 -20 12 -37 152 -89 169
-62 3 5 18 7 34 4 38 -5 63 9 102 58 35 44 29 53 -11 16 -37 -34 -92 -49 -165
-44 -53 3 -70 9 -103 36 -43 34 -51 38 -51 22z"
        />
        <path
          d="M1460 1633 c0 -16 16 -30 33 -30 10 0 16 5 14 11 -3 6 -10 10 -16 9
-6 -2 -11 2 -11 7 0 6 -4 10 -10 10 -5 0 -10 -3 -10 -7z"
        />
        <path
          d="M1380 1580 c9 -16 15 -18 30 -10 11 6 20 16 20 23 0 7 -4 6 -10 -3
-7 -12 -12 -12 -22 -2 -19 19 -30 14 -18 -8z"
        />
        <path
          d="M1555 1319 c-27 -11 -60 -17 -72 -14 -17 4 -36 -11 -94 -75 -77 -84
-96 -110 -81 -110 15 0 69 54 76 78 8 24 46 51 46 32 0 -7 17 -29 38 -49 32
-32 40 -49 51 -107 11 -59 10 -77 -3 -129 -26 -95 -18 -275 21 -529 l17 -109
70 7 c39 3 102 9 140 12 51 5 67 4 62 -5 -4 -6 -29 -11 -57 -11 -27 0 -49 -3
-49 -7 0 -11 103 -3 117 9 9 7 14 2 18 -19 3 -15 14 -54 24 -86 12 -40 16 -71
11 -97 -4 -22 -4 -37 1 -35 4 3 14 -14 22 -37 15 -43 15 -43 16 -11 1 17 -3
35 -9 38 -5 3 -10 28 -10 54 0 26 -13 99 -29 162 -16 63 -37 157 -46 209 -40
230 -64 320 -109 411 -57 114 -66 173 -36 251 25 66 46 90 56 62 4 -11 38 -50
76 -87 88 -89 93 -60 6 33 -35 37 -78 83 -96 103 -59 67 -109 83 -177 56z
m129 -60 c8 -9 8 -10 -1 -5 -7 4 -9 0 -6 -12 2 -11 -4 -27 -14 -37 -15 -16
-18 -36 -18 -139 0 -104 3 -126 21 -158 12 -21 25 -34 29 -30 5 4 5 -1 2 -10
-4 -10 -3 -18 1 -18 5 0 18 -18 30 -39 20 -35 21 -39 5 -45 -13 -5 -14 -9 -4
-19 9 -9 14 -9 22 3 9 13 10 12 5 -2 -3 -10 -1 -20 4 -23 24 -15 0 -75 -29
-75 -6 0 -11 -7 -11 -16 0 -10 -6 -14 -15 -10 -9 3 -15 0 -15 -8 0 -23 12 -25
48 -6 19 11 39 17 44 14 4 -3 8 -27 8 -55 0 -27 4 -49 9 -49 8 0 23 -84 22
-124 0 -40 -31 -54 -128 -58 -51 -2 -93 -1 -93 4 0 4 -7 8 -15 8 -20 0 -28 37
-29 131 -1 42 -4 72 -8 66 -4 -6 -7 11 -7 38 0 28 -2 93 -4 145 -3 65 2 125
14 190 11 52 19 99 19 103 0 4 12 19 27 33 l28 26 -39 -7 c-29 -6 -37 -5 -31
4 4 7 4 32 0 57 -5 34 -10 44 -25 44 -22 0 -75 64 -65 80 3 5 17 10 29 10 13
0 39 6 57 14 28 12 40 12 77 0 25 -7 50 -18 56 -25z"
        />
        <path
          d="M2161 1286 c-26 -28 -21 -52 8 -36 18 9 36 60 21 60 -3 0 -17 -11
-29 -24z"
        />
        <path
          d="M820 1228 c0 -19 103 -70 124 -62 13 5 0 15 -51 40 -80 39 -73 37
-73 22z"
        />
        <path
          d="M2120 1072 c0 -10 80 -46 87 -39 5 6 -20 21 -61 37 -14 5 -26 6 -26
2z"
        />
        <path
          d="M810 1034 c0 -3 8 -18 18 -32 10 -15 34 -62 52 -105 33 -75 61 -118
40 -60 -23 61 -94 203 -102 203 -4 0 -8 -3 -8 -6z"
        />
        <path d="M210 946 c0 -15 45 -66 57 -66 7 0 13 3 12 8 -1 9 -69 66 -69 58z" />
        <path
          d="M2705 813 c-3 -21 -18 -82 -32 -135 -14 -53 -23 -103 -20 -110 3 -7
6 -1 6 14 1 15 5 29 10 33 14 8 59 235 47 235 -3 0 -8 -17 -11 -37z"
        />
        <path d="M2278 685 c-4 -32 -5 -61 -3 -64 12 -11 16 11 13 65 l-3 59 -7 -60z" />
        <path
          d="M1000 631 c0 -5 12 -33 28 -63 15 -29 33 -69 41 -88 22 -56 61 -144
71 -160 5 -8 28 -50 52 -93 23 -42 45 -77 50 -77 4 0 8 -6 8 -12 0 -7 12 -26
26 -43 23 -27 22 -24 -7 30 -18 33 -40 71 -49 85 -17 25 -150 294 -189 383
-20 45 -31 58 -31 38z"
        />
        <path
          d="M2270 556 c0 -30 -3 -61 -6 -70 -3 -9 -2 -16 4 -16 12 0 21 130 10
137 -5 2 -8 -20 -8 -51z"
        />
        <path
          d="M2260 425 c0 -33 -33 -258 -46 -315 -3 -15 -2 -21 4 -15 5 6 17 56
28 113 10 56 21 102 24 102 10 0 10 150 0 150 -6 0 -10 -16 -10 -35z"
        />
        <path
          d="M2955 401 c-5 -22 -14 -31 -35 -36 -16 -3 -34 -13 -41 -21 -15 -18
-10 -18 44 6 36 16 46 26 49 50 6 39 -8 39 -17 1z"
        />
        <path
          d="M2697 381 c-27 -26 -36 -39 -24 -37 15 2 77 59 77 72 0 10 -14 1 -53
-35z"
        />
        <path
          d="M2757 344 c-22 -14 -37 -27 -34 -30 2 -2 28 0 58 5 30 5 44 9 31 10
-19 1 -22 5 -17 21 8 24 9 25 -38 -6z"
        />
        <path d="M1575 290 l-40 -7 47 -2 c26 0 50 4 53 9 7 11 1 11 -60 0z" />
        <path
          d="M13 247 c11 -24 12 -50 6 -101 -9 -72 -5 -99 7 -50 11 47 14 47 47 5
29 -38 47 -51 47 -34 0 4 -9 16 -19 27 -11 12 -21 28 -23 36 -2 8 -7 18 -13
22 -5 4 -10 30 -9 58 0 27 -3 50 -7 50 -5 0 -6 -8 -3 -17 3 -10 -3 -6 -12 10
-25 37 -37 34 -21 -6z"
        />
        <path
          d="M70 226 c0 -2 16 -14 35 -26 38 -23 133 -50 175 -49 14 1 0 7 -30 14
-71 17 -148 44 -156 56 -5 9 -24 13 -24 5z"
        />
        <path
          d="M356 201 c-7 -10 54 -22 68 -13 11 6 -20 20 -46 21 -9 1 -19 -3 -22
-8z"
        />
        <path
          d="M165 130 c11 -18 81 -33 101 -22 17 10 15 11 -11 12 -17 0 -45 4 -63
9 -19 6 -30 6 -27 1z"
        />
        <path
          d="M400 124 c-78 -12 -140 -28 -133 -34 15 -13 62 -20 68 -10 4 6 -1 7
-12 3 -14 -4 -15 -3 -7 6 12 13 37 16 72 7 15 -3 30 2 42 14 20 20 18 21 -30
14z"
        />
        <path
          d="M590 90 c-14 -11 -29 -20 -33 -20 -5 0 -15 -6 -22 -12 -8 -7 -22 -19
-30 -27 -9 -7 -14 -15 -11 -18 6 -6 39 14 75 46 13 11 27 21 31 21 5 0 10 7
14 15 7 19 6 19 -24 -5z"
        />
      </g>
    </svg>
  )
}

export default AnimatedSVG
