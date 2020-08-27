import React from 'react';
import Child from './child';

export default function Parent() {
    const myref=React.useRef();

        const handleOnClick = () => {
          
              myref.current.sayHi();
           
        }

    return (
        <div>
            <Child ref={myref} />
        <button onClick={handleOnClick}>Click me</button>
        </div>
    );
}


