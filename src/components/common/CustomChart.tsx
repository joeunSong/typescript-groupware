// * basic
import { forwardRef } from 'react';
//  * install libraries
import _ from 'lodash';
import { Chart } from 'primereact/chart';

const CustomChartLayout = forwardRef(({ type, data, options, plugins, className, width, height }: any, ref: any) => {
  return <Chart ref={ref} type={type} data={data} options={options} plugins={plugins} className={className} width={width} height={height} />;
});

CustomChartLayout.displayName = 'CustomChartLayout';

export default CustomChartLayout;

// * Chart 옵션
// const pieOptions = {
//     // * 애니메이션 (true로 바꿔도 애니메이션 활성화 안됨 ) (Path2D 캐싱을 사용 - canvas에서 2d를 그릴때 사용하는 캐싱방식)
//     // animation: false,
//     animation: {
//         duration: 1000, // 애니메이션에 소요되는 시간(밀리초)입니다. (number)
//         // 사용 가능한 옵션은 다음과 같습니다. (string)
//         // 'linear','easeInQuad','easeOutQuad','easeInOutQuad','easeInCubic','easeOutCubic','easeInOutCubic','easeInQuart',
//         // 'easeOutQuart','easeInOutQuart','easeInQuint','easeOutQuint','easeInOutQuint','easeInSine','easeOutSine',
//         // 'easeInOutSine','easeInExpo','easeOutExpo','easeInOutExpo','easeInCirc','easeOutCirc','easeInOutCirc',
//         // 'easeInElastic','easeOutElastic','easeInOutElastic','easeInBack','easeOutBack','easeInOutBack','easeInBounce','easeOutBounce','easeInOutBounce'
//         easing: "linear",
//         delay: 1, // 애니메이션을 시작하기 전에 지연하십시오.(number)
//         loop: false, // 애니메이션이 끝없이 반복됩니다.(boolean)
//         // 1000, 'easeOutQuart', undefined, undefined가 기본값

//         // 애니메이션 진행도
//         // onProgress: function (animation: any) {
//         //     const progress: any = document.getElementById("animationProgress")
//         //     progress.value = animation.currentStep / animation.numSteps
//         // },
//     },
//     // * 애니메이션 속성
//     animations: {
//         // properties : ["","",""], // 이 구성이 적용되는 속성 이름입니다. 기본값은 이 객체의 키 이름(string[])
//         // type: , // 속성 유형에 따라 사용되는 보간기가 결정(string)
//         from: 1, // 애니메이션의 시작 값입니다 (number, color, boolean)
//         to: 0, // 애니메이션의 끝 값입니다(number, color, boolean)
//         // fn : // 사전 정의된 보간기를 사용하는 대신 선택적 사용자 지정 보간기 (<T>(from: T, to: T, factor: number) => T;)
//         // key, typeof property, undefined, undefined, undefined
//     },
//     transitions: {
//         // active :, // 호버 애니메이션의 기본 지속 시간을 400ms로 재정의
//         // resize:, // 크기 조정을 위해 기본 기간을 0ms(= 애니메이션 없음)로 재정의
//         // show: // 애니메이션 색상,표시
//         // hide: // 애니메이션 색상,표시
//     },
//     // * 패딩을 정의
//     layout: {
//         width: "100%",
//         height: "100px",
//         padding: {
//             left: 50,
//             right: 50,
//             top: 50,
//             bottom: 50,
//         },
//     },
//     scales: {
//         // * x축 최소,최대값 정의
//         // x: {
//         //     type: "time",
//         //     min: new Date("2019-01-01").valueOf(),
//         //     max: new Date("2019-12-31").valueOf(),
//         // },
//         // * y축 최소,최대값 정의
//         // y: {
//         //     type: "linear",
//         //     min: 0,
//         //     max: 100,
//         // },
//         //* ???
//         // r: {
//         //     ticks: {
//         //         backdropPadding: {
//         //             x: 0,
//         //             y: 0,
//         //         },
//         //     },
//         // },
//     },

//     // * 이벤트가 클릭 이벤트에만 반응함
//     events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"], // ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']  차트가 수신해야 하는 브라우저 이벤트를 정의 (string[])

//     // * 플러그인 속성 정의
//     plugins: {
//         tooltip: {
//             events: ["mousemove"],
//             callbacks: {
//                 label: function (tooltipItem: any) {
//                     return tooltipItem.label + " " + tooltipItem.dataset.data[tooltipItem.dataIndex] + "GB"
//                 },
//             },
//         },
//         // 범례
//         legend: {
//             display: true, // 범례 표시여부(boolean)
//             position: "bottom", // 범례의 위치(string) 'top','left','bottom','right','chartArea'
//             align: "center", // 범례의 정렬 (string) 'start','center','end'
//             // maxHeight: , //범례의 최대 높이(number)
//             // maxWeight: 300, //범례의 최대 너비(number)
//             // fullSize: false, // 캔버스 전체 너비/높이를 차지해야 함을 표시(boolean)
//             onClick: (event: any, legendItem: any, legend: any) => {
//                 console.log("onClick")
//                 console.log("event : ", event)
//                 console.log("legendItem : ", legendItem)
//                 console.log("legend : ", legend)
//             }, // 라벨 항목에 클릭 이벤트가 등록되면 호출되는 콜백
//             onHover: (event: any, legendItem: any, legend: any) => {
//                 console.log("onHover")
//                 console.log("event : ", event)
//                 console.log("legendItem : ", legendItem)
//                 console.log("legend : ", legend)
//             }, // 라벨 항목 위에 'mousemove' 이벤트가 등록되었을 때 호출되는 콜백
//             onLeave: (event: any, legendItem: any, legend: any) => {
//                 console.log("onLeave")
//                 console.log("event : ", event)
//                 console.log("legendItem : ", legendItem)
//                 console.log("legend : ", legend)
//             }, // 이전에 마우스를 올렸던 라벨 항목 외부에 'mousemove' 이벤트가 등록될 때 호출되는 콜백
//             reverse: false, // 데이터를 역순으로 표시 (boolean)
//             // * 범례 라벨 구성
//             labels: {
//                 boxWidth: 10, // 컬러 상자의 너비(number)
//                 boxHeight: 10, // 컬러 상자의 높이(number)
//                 color: "#000000", // 라벨 색상
//                 // * 범례 글꼴
//                 font: {
//                     // family : , // 모든 텍스트의 기본 글꼴 모음은 CSS 글꼴 모음 옵션을 따름 (string)
//                     size: 14, // 텍스트의 기본 글꼴 크기(number) / 방사형 선형 축척 포인트 레이블에는 적용되지 않습니다
//                     // style : , // 기본 글꼴 스타일 (string) / 도구 설명 제목이나 바닥글에는 적용되지 않습니다 / 차트 제목에는 적용되지 않습니다 / CSS 글꼴 스타일 옵션(예: 일반, 기울임꼴, 기울임꼴, 초기, 상속)을 따릅니다
//                     weight: "bold", // 기본 글꼴 두께(normal| bold| lighter| bolder|number)
//                     // lineHeight: , // 개별 텍스트 줄의 높이(number|string)
//                 },
//                 padding: 10, // 색상 상자 행 사이의 패딩 (number)
//                  generateLabels: (legend: any) => {
//                      console.log("legend", legend)
// legend onClick함수에 전달된 항목은 에서 반환된 항목입니다
// labels.generateLabels. 이러한 항목은 다음 인터페이스를 구현해야 합니다.
//  // Label that will be displayed
//  text: string,
//  // Border radius of the legend item.
//  // Introduced in 3.1.0
//  borderRadius?: number | BorderRadius,
//  // Index of the associated dataset
//  datasetIndex: number,
//  // Fill style of the legend box
//  fillStyle: Color,
//  // Text color
//  fontColor: Color,
//  // If true, this item represents a hidden dataset. Label will be rendered with a strike-through effect
//  hidden: boolean,
//  // For box border. See https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap
//  lineCap: string,
//  // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
//  lineDash: number[],
//  // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
//  lineDashOffset: number,
//  // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
//  lineJoin: string,
//  // Width of box border
//  lineWidth: number,
//  // Stroke style of the legend box
//  strokeStyle: Color,
//  // Point style of the legend box (only used if usePointStyle is true)
//  pointStyle: string | Image | HTMLCanvasElement,
//  // Rotation of the point in degrees (only used if usePointStyle is true)
//  rotation: number
//                 }, // 범례의 각 사물에 대한 범례 항목을 생성합니다. 기본 구현은 색상 상자에 대한 텍스트 + 스타일을 반환(function)
//                 // filter: ((legend : any, data : any) => {

//                 // }), // 범례에서 범례 항목을 필터링합니다. 2개의 매개변수를 받습니다. 범례, 차트 데이터(function)
//                 // sort: ((a: any, b: any, data: any) => {

//                 // }), // 범례 항목을 정렬 / 함수의 반환 값은 두 범례 항목 매개 변수의 순서를 나타내는 숫자(function)
//                 pointStyle: "circle", // 지정된 경우 이 점 스타일이 범례에 사용됩니다. usePointStyletrue인 경우에만 사용 (pointStyle)
//                 // textAlign: "center", // 레이블 텍스트의 가로 정렬 left, right, center (string)
//                 usePointStyle: true, // 색깔 박스 포인터 형식으로 변경 (크기는 pointStyleWidth 또는 boxWidth와font.size 사이의 최소값을 기준)(boolean)
//                 // pointStyleWidth: null, // true인 경우 usePointStyle범례에 사용되는 포인트 스타일의 너비 (number)
//                 // useBorderRadius: true, // borderRadius 라벨은 해당 borderRadius와 일치 (boolean)
//                 // borderRadius: 6, // borderRadius를 재정의(number)
//             },
//             rtl: false, // 범례를 오른쪽에서 왼쪽으로 렌더링 (boolean)
//             // textDirection: "ltr", // 범례를 렌더링하기 위해 텍스트 방향 'rtl'이나 'ltr'캔버스에 강제로 적용 (string)

//             // * 범례 제목 구성
//             title: {
//                 display: true, // 범례 제목 표시 여부(boolean)
//                 // color: "#ff1122", // 텍스트 색상(Color)
//                 // font : , // 글꼴(Font)
//                 padding: 10, // 제묵 주위를 패딩(number)
//                 text: "", // 제목(string)
//             },
//         },

//         colors: {
//             forceOverride: true, // 기본 색상 추가 활성화 (boolean)
//         },
//     },
// }
