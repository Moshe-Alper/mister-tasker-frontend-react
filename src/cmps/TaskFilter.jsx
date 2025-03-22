import { useState, useEffect } from 'react'

export function TaskFilter({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    
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
                if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }
    
    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', minImportance: '', status: '' })
    }
    
    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    }
    
    const statusOptions = [
        { value: 'new', label: 'New' },
        { value: 'done', label: 'Done' },
        { value: 'failed', label: 'Failed' }
    ]
    
    return <section className="task-filter">
        <h3>Filter:</h3>
        <input
            type="text"
            name="txt"
            value={filterToEdit.txt}
            placeholder="Search for a title"
            onChange={handleChange}
        />
        <input
            type="number"
            min="0"
            name="minImportance"
            value={filterToEdit.minImportance}
            placeholder="Min. importance"
            onChange={handleChange}
        />
        
        <div className="status-options">
            <span>Status:</span>
            <div className="status-radio-group">
                {statusOptions.map(option => (
                    <label key={option.value}>
                        <input
                            type="radio"
                            name="status"
                            value={option.value}
                            checked={filterToEdit.status === option.value}
                            onChange={handleChange}
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
        
        <button
            className="btn-clear"
            onClick={clearFilter}>
            Clear
        </button>
        
        <h3>Sort:</h3>
        
        <div className="sort-field">
            <label>
                <input
                    type="radio"
                    name="sortField"
                    value="importance"
                    checked={filterToEdit.sortField === 'importance'}
                    onChange={handleChange}
                />
                <span>Importance</span>
            </label>
            <label>
                <input
                    type="radio"
                    name="sortField"
                    value="title"
                    checked={filterToEdit.sortField === 'title'}
                    onChange={handleChange}
                />
                <span>Title</span>
            </label>
            <label>
                <input
                    type="radio"
                    name="sortField"
                    value="status"
                    checked={filterToEdit.sortField === 'status'}
                    onChange={handleChange}
                />
                <span>Status</span>
            </label>
        </div>
        
        <div className="sort-dir">
            <label>
                <input
                    type="radio"
                    name="sortDir"
                    value="1"
                    checked={filterToEdit.sortDir === 1}
                    onChange={handleChange}
                />
                <span>Asc</span>
            </label>
            <label>
                <input
                    type="radio"
                    name="sortDir"
                    value="-1"
                    checked={filterToEdit.sortDir === -1}
                    onChange={handleChange}
                />
                <span>Desc</span>
            </label>
        </div>
        
        <button
            className="btn-clear"
            onClick={clearSort}>
            Clear
        </button>
    </section>
}