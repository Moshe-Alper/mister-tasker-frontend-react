import { useState, useEffect } from 'react'

export function TaskFilter({ filterBy, setFilterBy }) {
    const [ filterToEdit, setFilterToEdit ] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if(!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', minImportance: '' })
    }
    
    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    }

    return <section className="task-filter">
            <h3>Filter:</h3>
            <input
                type="text"
                name="txt"
                value={filterToEdit.txt}
                placeholder="Free text"
                onChange={handleChange}
                required
            />
            <input
                type="number"
                min="0"
                name="minImportance"
                value={filterToEdit.minImportance}
                placeholder="min. importance"
                onChange={handleChange}
                required
            />
            <button 
                className="btn-clear" 
                onClick={clearFilter}>Clear</button>
            <h3>Sort:</h3>
            <div className="sort-field">
                <label>
                    <span>Importance</span>
                    <input
                        type="radio"
                        name="sortField"
                        value="importance"
                        checked={filterToEdit.sortField === 'importance'}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span>Title</span>
                    <input
                        type="radio"
                        name="sortField"
                        value="title"
                        checked={filterToEdit.sortField === 'title'}            
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span>Owner</span>
                    <input
                        type="radio"
                        name="sortField"
                        value="owner"
                        checked={filterToEdit.sortField === 'owner'}                        
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="sort-dir">
                <label>
                    <span>Asce</span>
                    <input
                        type="radio"
                        name="sortDir"
                        value="1"
                        checked={filterToEdit.sortDir === 1}                        
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span>Desc</span>
                    <input
                        type="radio"
                        name="sortDir"
                        value="-1"
                        onChange={handleChange}
                        checked={filterToEdit.sortDir === -1}                        
                    />
                </label>
            </div>
            <button 
                className="btn-clear" 
                onClick={clearSort}>Clear</button>
    </section>
}