import { MdOutlineHelpOutline } from "react-icons/md";

export default function livestockForm() {
    return <div className="form-full-page">
        <div className="form-head">
            <h1 className="form-header">Livestock Record Details</h1>
            <div>
                <MdOutlineHelpOutline title="help" className="help-icon" />
            </div>

        </div>
        <div>
            <div className="general-form">
                <div className="column-1">
                    <p>Breed</p>
                    <input type="text" className="input-box" />
                    <p>Tag ID</p>
                    <input type="text" className="input-box" />
                    <p>Birthdate</p>
                    <input type="date" className="input-box" />
                    <p>Sex</p>
                    <input type="text" className="input-box" />
                    <p>Tag Location</p>
                    <input type="text" className="input-box" />
                </div>
                <div className="column-2">
                    <p>Weight</p>
                    <input type="number" className="input-box" />
                    <p>Status</p>
                    <input type="text" className="input-box" />
                    <p>Origin</p>
                    <select type="text" className="input-box">
                        <option>Born innfarm</option>
                        <option>purchages</option>
                        <option>shsjhsjk</option>
                    </select>
                    <p>Remark</p>
                    <input type="range" className="input-box" />
                    <div className="btns">
                        <button className="form-btn1">Save</button>
                        <button className="form-btn2">Cancel</button>
                    </div>
                </div>
            </div>
            <div>
                jhjdh
            </div>
        </div>



    </div>
}