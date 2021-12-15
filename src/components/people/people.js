import React from "react";
import PeopleCard from "./peopleCard";
import style from './peopleCard.module.css'

class People extends React.Component {
    constructor(){
        super()

        this.state = {
            isLoaded: false,
            people: []
        }

    }
    componentDidMount(){
        // $.ajax({
        //     url: 'https://randomuser.me/api/',
        //     dataType: 'json',
        //     success: function(data) {
        //       console.log(data);
        //     }
        // });
        fetch('https://randomuser.me/api/?results=50')
        .then(res => res.json())
        .then((result) => {
            // console.log(result.results)

            var people = []
            result.results.forEach((person) => {
                const {name,email,location,picture,phone} = person
                people.push({
                    name,
                    email,
                    location,
                    picture,
                    phone
                })
                // console.log(person)
                // console.log(name,email,address,picture,phone)
            })

            // console.log(people)

            this.setState({
                isLoaded: true,
                people: people
            })
        })
    }
    render(){
        document.body.style.overflowY = "scroll"
        document.body.style.overflowX = "hidden"
        const {people, isLoaded} = this.state
        // console.log(people[0])
        return (
            <div>
                {/* {people.map((person) => {
                    <p>{person.name.first}</p>
                })} */}
                {isLoaded?
                (
                    <div className={style.container_cards}>
                        {people.map((person) => <PeopleCard 
                            name={person.name}
                            email={person.email}
                            location={person.location}
                            picture={person.picture}
                            phone={person.phone}
                            key={person.phone}
                        />)}
                        
                    </div>
                )
                :(
                    <div>Loading</div>
                )
                }
            </div>
        )
    }
}

export default People