import { requestAnimationFrame, cancelAnimationFrame } from 'raf-dom';

console.log(requestAnimationFrame, cancelAnimationFrame)

class Test extends React.Component {
    render() {
        return <div className="test">123</div>;
    }
}
