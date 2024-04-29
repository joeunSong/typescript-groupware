// * basic
// * svg

const render = (src: any, w: any, h: any, className: any, onClick: any | undefined = null) => {
  return (
    <></>
    // <Image
    //   alt=''
    //   priority={true}
    //   className={[
    //     `w-${w && h ? w : '5'} h-${w && h ? h : '5'}`,
    //     className !== undefined ? className : '',
    //   ].join(' ')}
    //   // className={classNames(w && h ? `w-${w} h-${h}` : 'w-5 h-5')}
    //   width={200}
    //   height={200}
    //   unoptimized={true}
    //   src={src}
    //   loader={({ src, width, quality }) => {
    //     return `${src}?w=${width}&q=${quality || 100}`;
    //   }}
    //   onClick={() => {
    //     if (onClick !== null) {
    //       onClick();
    //     }
    //   }}
    // />
  );
};

// icon
export const TestIcon = (props: any) => render(props.w, props.h, props.className, props.onClick);
