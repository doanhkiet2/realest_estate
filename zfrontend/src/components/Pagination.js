import React from 'react'

const pagination = (props) => {
    console.log("props.listingCount", props.listingCount)

    const getPagination = () => {
        let result = []
        let page = 1


        //need to know: why don use: pagenum = page => unsafe
        for (let i = 0; i < props.listingCount; i += props.itemPerPage) {
            const pagenum = page
            let style = 'pagination__number'
            let content = ''

            if (props.active === pagenum) { //prevent infict click
                style = 'pagination__number pagination__number--active'
                content = (
                    <div className={style} key={i}>{pagenum}</div>
                )
            } 
            else {
                content = (
                    <div className={style} key={i} onClick={() => props.visitPage(pagenum)}>
                        {pagenum}
                    </div>
                )
            }
            page++
            result.push(content)
        }

        return result
    }


    return (
        <div className='pagination'>
            <div onClick={() => props.previous()} className="pagination__number pagination__arrow">
                previous
            </div>
            {getPagination()}
            <div onClick={() => props.next()} className="pagination__number pagination__arrow">
                next
            </div>
        </div>
    )   

}

export default pagination