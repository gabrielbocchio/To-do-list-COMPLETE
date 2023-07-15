import "./form.css"
const Form = ({setNewItem, addItem, newItem, validationError}) => {
  return (
    <div>
        <form onSubmit={addItem}>
        <input
          value={newItem}
          className="input-style"
          placeholder="Add a task..."
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
        />
        <button 
            type="submit"
            className="button-style"
            >+</button>
         {validationError && <div className="error-message">{validationError}</div>}
      </form>
    </div>
  )
}

export default Form
