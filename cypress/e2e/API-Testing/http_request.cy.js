/// <reference types="cypress" />

describe('API Testing for reqres.in - Users API', () => {
    
    it('Get User list on Page 2', () => {
        cy.request({
            method: 'GET',
            url: `https://reqres.in/api/users?page=2`,

        })
        .then((response)=>{
            // Assert status code
            expect(response.status).to.eql(200)
            // Assert response duration
            expect(response.duration).to.not.be.greaterThan(5000)   
            // Assert response body
            expect(response.body).to.have.property('page', 2);
            expect(response.body).to.have.property('per_page',6);
            expect(response.body).to.have.property('total',12);
            expect(response.body).to.have.property('total_pages',2);
            expect(response.body.page).to.be.a('number');
            expect(response.body.per_page).to.be.a('number');
            expect(response.body.total).to.be.a('number');
            expect(response.body.total_pages).to.be.a('number');
            expect(response.body.data).to.be.an('array');
            expect(response.body.data.length).to.eql(response.body.per_page)
            expect(response.body).to.have.nested.property('data[0].id', 7);
            expect(response.body).to.have.nested.property('data[0].email', 'michael.lawson@reqres.in');
            expect(response.body).to.have.nested.property('data[0].first_name', 'Michael');
            expect(response.body).to.have.nested.property('data[0].last_name', 'Lawson');
            expect(response.body).to.have.nested.property('data[0].avatar', 'https://reqres.in/img/faces/7-image.jpg');
        })
    });

    it('The response firstName, lastName, & email should be exported to csv file', () => {
        cy.request({
            method: 'GET',
            url: `https://reqres.in/api/users?page=2`,

        })
        .then((response)=>{
            const data = [["First Name", "Last Name", "Email"]];

            for (let i = 0; i < response.body.data.length; i++) {
                data.push([
                    response.body.data[i].first_name,
                    response.body.data[i].last_name,
                    response.body.data[i].email
                ]);
            }
            const csvContent = data.map((row) => row.join(",")).join("\n");
            cy.writeFile("cypress/fixtures/data.csv", csvContent);
        })
    });
});