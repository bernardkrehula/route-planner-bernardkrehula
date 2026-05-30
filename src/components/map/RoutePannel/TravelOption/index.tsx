import './index.css';

const TravelOption = () => {
    return(
        <div className="traveling-options-div">
        <select name="traveling" className="traveling-options">
          <option value='driving'>Driving 🚗</option>
          <option value='walking'>Walking 🚶‍♂️</option>
        </select>
        <span>▼</span>
      </div>
    )
}
export default TravelOption;