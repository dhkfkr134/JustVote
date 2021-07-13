import React, {useState} from 'react'
import { connect } from 'react-redux'
import { addView } from '../redux/index'

const Views = ({count, addView}) => {
  const [number, setNumber] = useState(1)

  return (
    <div className="items">
      <h2>조회 수 : {count}</h2>
      <input type="text" value={number} onChange={(e) => setNumber(e.target.value)}></input>
      <button onClick={()=> addView(number)}>조회하기!</button>
    </div>
  )
}

const mapStateToProps = ({views}) => {
  return {
    count: views.count
  }
}

/*
function mapStateToProps() {
  return {
    count: state.count
  }
}
*/

const mapDispatchToProps = {
  addView: (number)=> addView(number)
}

export default connect(mapStateToProps, mapDispatchToProps)(Views)