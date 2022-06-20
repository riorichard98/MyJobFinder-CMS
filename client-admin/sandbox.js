// function renderSKillInput() {
//     let output = []
//     for (let i = 0; i < skillInput; i++) {
//         output.push(<div className="d-flex mb-1">
//             <Form.Group className="w-70" controlId="formBasicEmail">
//                 <Form.Control onChange={e => skillState(e, i)} type="text" placeholder="skill" />
//             </Form.Group>
//             <Form.Group className="ms-3 d-flex" controlId="formBasicEmail">
//                 <select onChange={e => levelState(e, i)} className="form-select " aria-label="Default select example">
//                     <option className="d-none text-white-50" selected>Level</option>
//                     <option value={'intermediate'}>intermediate</option>
//                     <option value={'advanced'}>advanced</option>
//                 </select>
//                 <Button onClick={increaseSkillInput}>+</Button>
//             </Form.Group>
//         </div>)
//     }
//     return output
// }