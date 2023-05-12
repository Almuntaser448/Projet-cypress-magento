const { faker } = require("@faker-js/faker");

describe('Test de site magento' , () => {
    it("valider un achat" ,()=>{
        cy.intercept({
            url:"https://magento.softwaretestingboard.com/customer/section/load/*",
            method:"GET",
        }).as('waitAddToCart');
        cy.intercept({
            url:"https://magento.softwaretestingboard.com/pub/static/version1678540400/frontend/Magento/luma/en_US/Magento_CheckoutAgreements/template/checkout/checkout-agreements.html",
            method:"GET",
        }).as('waitPayment');
        cy.intercept({
            url:"https://magento.softwaretestingboard.com/pub/static/version1678540400/frontend/Magento/luma/en_US/Magento_Checkout/template/progress-bar.html",
            method:"GET",
        }).as('waitShipping');
        cy.visit('https://magento.softwaretestingboard.com')
        cy.percySnapshot('hi',{widths : [1000,330,321]})

        cy.get('#ui-id-4 > .ui-menu-icon').trigger('mouseover')
        cy.get('#ui-id-9').click()
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
        cy.get('#option-label-size-143-item-167').click()
        cy.get('#option-label-color-93-item-57').click()
        cy.get('#product-addtocart-button').click()
        cy.wait("@waitAddToCart")
        cy.get('.showcart').click()
        cy.wait(1000)
        cy.get('[id^="cart-item-"][id$="-qty"]').clear().type(3)
        cy.get('[id^="update-cart-item-"]').click()
        cy.wait("@waitAddToCart")
        cy.get('#top-cart-btn-checkout').click()
        cy.wait("@waitShipping")
        cy.get('#customer-email-fieldset > .required > .control > #customer-email').type(faker.internet.email())
        cy.get('[name="firstname"]').type(faker.name.firstName())
        cy.get('[name="lastname"]').type(faker.name.lastName())
        cy.get('[name="country_id"]').select('France')
        cy.get(':nth-child(2) > ._required').type(faker.address.streetAddress())
        cy.get('[name="city"]').type(faker.address.city())
        cy.get('[name="postcode"]').type(faker.address.zipCode('#####'))
        cy.get('[name="telephone"]').type(faker.phone.number())
        cy.get(':nth-child(2) > :nth-child(1) > .radio').check()
        cy.get('.button').click()
        cy.wait("@waitPayment")
        cy.get('#billing-address-same-as-shipping-checkmo').check()
        cy.get('#billing-address-same-as-shipping-checkmo').uncheck()
        cy.get('[name="billingAddresscheckmo.firstname"]').type(faker.name.firstName())
        cy.get('[name="billingAddresscheckmo.lastname"]').type(faker.name.lastName())
        cy.get('[name="billingAddresscheckmo.region_id"]').find('select[class="select"]').select('Florida')
        cy.get('.billing-address-form > form > .fieldset > .street > :nth-child(2) > ._required').type(faker.address.street())
        cy.get('[name="billingAddresscheckmo.city"]').type(faker.address.city())
        cy.get('[name="billingAddresscheckmo.postcode"]').type(faker.address.zipCode('#####'))
        cy.get('[name="billingAddresscheckmo.telephone"]').type(faker.phone.number())
        cy.get('.action-update').click()
        cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click()
        cy.wait("@waitAddToCart")
        cy.get('.checkout-success > .actions-toolbar > div.primary > .action').click()
        cy.url().should('eq', 'https://magento.softwaretestingboard.com/')
        })
    })