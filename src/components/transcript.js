import React from 'react'

export const Transcript = ({gene}) => {
    if (gene){
        return (
            <div className="media text-muted pt-3" >
                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <h6 className="mt-0">
                        {gene.id}
                        <a href={"http://www.ensembl.org/id/" + gene.id} className="badge badge-info float-right" target="_blank" rel = "noopener noreferrer">Visit website</a>
                    </h6>
                    <p className="h6">Transcript</p>
                    <div className="row">
                        <div className="col-3">
                            <strong className="text-info">Parent: </strong>
                            {gene.Parent}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">Biotype: </strong>
                            {gene.biotype}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">Species: </strong>
                            {gene.Translation.species}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">Assembly Name: </strong>
                            {gene.assembly_name}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">Display Name: </strong>
                            {gene.display_name}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">Logical Name: </strong>
                            {gene.logic_name}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">version: </strong>
                            {gene.version}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">Start: </strong>
                            {gene.Translation.start}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">End: </strong>
                            {gene.Translation.end}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">Source: </strong>
                            {gene.source}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">DBType: </strong>
                            {gene.Translation.db_type}
                        </div>
                        <div className="col-3">
                            <strong className="text-info">Strand: </strong>
                            {gene.strand}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    } else {
        return (
        <div className="alert alert-info" role="alert">
            something went wrong!
        </div>
        )
    }
	
}