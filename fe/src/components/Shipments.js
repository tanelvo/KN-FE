import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import axios from 'axios';


function Shipments() {
    const baseUrl = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0";
    const [listArray, setList] = useState([]);
    const [value, setValue] = useState();       // For reloading the table after deleting a row
    const Count = [];
    const arr = [];

    const [orderno, setOrderno] = useState();
    const [date, setDate] = useState();
    const [customer, setCustomer] = useState();
    const [trackingno, setTrackingno] = useState();
    const [status, setStatus] = useState();
    const [consignee, setConsignee] = useState();
    const [show, setShow] = useState(false);
    
    // Fetching the data
    const fetchData = async () => {
        const url = `${baseUrl}`;
        const response = await axios.get(url);
        console.log(response.data);
        response.data.forEach(element => {      // Setting each piece of data into an array
            arr.push(element);
        });
        setList(arr);

    };
    useEffect(() => {
        fetchData();
    },[]);

    
    for(var i = 0; i < listArray.length; i++){Count.push(i)}    // To generate required number of rows for the table

    let tableList = Count.map((i)=>{                            // Generates the tables with there correct fields
        return(
                <tr>
                    <th>{ listArray[i].orderNo }</th>
                    <th>{ listArray[i].date }</th>
                    <th>{ listArray[i].customer }</th>
                    <th>{ listArray[i].trackingNo }</th>
                    <th>{ listArray[i].status }</th>
                    <th>{ listArray[i].consignee }</th>
                    <th>
                        <Button onClick={()=>{                      // Changes data in the pop-up panel to the picked row's data
                            setOrderno(listArray[i].orderNo);
                            setDate(listArray[i].date);
                            setCustomer(listArray[i].customer);
                            setTrackingno(listArray[i].trackingNo);
                            setStatus(listArray[i].status);
                            setConsignee(listArray[i].consignee);
                            setShow(true);
                        }}>Details</Button>
                    </th>
                    <th>    
                        <Button variant='danger' onClick={()=> {listArray.splice(i, 1); setValue({});} }>Delete</Button>
                    </th>
                </tr>

            
        )
    });

    return(
        <div>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>ORDERNO</th>
                        <th>DELIVERY DATE</th>
                        <th>CUSTOMER</th>
                        <th>TRACKINGNO</th>
                        <th>STATUS</th>
                        <th>CONSIGNEE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableList}
                </tbody>
            </Table>
            <Modal show={show} size="lg" onHide={()=>{setShow(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Shipment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div style={{width:"50%", float: "left"}}>
                            <h4>OrderNo</h4>
                            <p>{ orderno }</p>
                            <h4>Customer</h4>
                            <p>{ customer }</p>
                            <h4>Consignee</h4>
                            <p>{ consignee }</p>
                        </div>
                        <div style={{width:"50%", float: "left"}}>
                            <h4>Date</h4>
                            <p>{ date }</p>
                            <h4>TrackingNo</h4>
                            <p>{ trackingno }</p>
                            <h4>Status</h4>
                            <p>{ status }</p>
                        </div>
                    </div>    
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Shipments