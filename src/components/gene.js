import React, { Component } from 'react';
import { Transcript } from './transcript';

class Gene extends Component {
    constructor(props){
        super(props)
        this.state = {
            geneSymbol: '',
            position: '',
            letter: '',
            loading: false,
            data: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit(event) {
        if (
            Object.values(this.state).filter(
                e => (typeof(e) === 'string' && e.trim() !== '')
            ).length === 3
        ){
            this.setState({loading: true});
            this.getApiData();
        
        }
        event.preventDefault();
    }



    getApiData(){

        let url = 'http://rest.ensembl.org/lookup/symbol/homo_sapiens/';
        url += this.state.geneSymbol
        url += '?content-type=application/json;expand=1';
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    result['Transcript'].forEach(element => {
                        this.setState({data : []});
                        if(element['Translation'] && element['Translation'].id){
                            this.checkSequence(element);    
                        } 
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }


    checkSequence(element) {
        let url = "http://rest.ensembl.org/sequence/id/"+element['Translation'].id+".json?type";
        fetch(url)
            .then(res => res.json())
            .then(result => {
                if (result.seq && result.seq.length >= this.state.position){
                    let position = this.state.position;
                    position -= 1;
                    // get the position character 
                    let positionChar = result.seq.slice(position)[0];
                    // check if the values match with amino acid
                    if( 
                        positionChar === this.state.letter.toLocaleUpperCase()
                    ){
                        this.setState({
                            data : [
                                ...this.state.data, element
                            ]
                        });
                        window.genedataresult = this.state.data;
                        this.setState({loading: false});
                    }
                    
                }
            });

    }
    render() {
        return (
          <>
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">
            Search By Gene Symbol
            </h6>
            <div className="mt-3">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="geneSymbol">Gene Symbol</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="geneSymbol" 
                                name="geneSymbol"
                                required
                                onChange={this.handleChange}
                                value={this.state.geneSymbol}
                                placeholder="ex: BRAF"></input>
                        </div>
                        <div className="col">
                            <label htmlFor="position">Position</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="position" 
                                name="position"
                                value={this.state.position}
                                onChange={this.handleChange}
                                placeholder="ex: 600"></input>
                        </div>
                        <div className="col">
                            <label htmlFor="letter">Amino Acid Letter</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="letter" 
                                name="letter"
                                value={this.state.letter}
                                onChange={this.handleChange}
                                placeholder="ex: V"></input>
                        </div>
                        <div className="col">
                            <br />
                            {this.state.loading ? 
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                            : <button type="submit" className="btn btn-primary">Submit</button>}
                        </div>
                    </div>
                </form>
            </div>
        </div> 
        { this.state.data.length > 0 &&
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">Show Results</h6>
            {this.state.data.map(
                (element, i) => 
                    <Transcript 
                        key={i}
                        gene={element} 
                    />

            )}
          </div>
        }
        </>
        );
    }
}

export default Gene