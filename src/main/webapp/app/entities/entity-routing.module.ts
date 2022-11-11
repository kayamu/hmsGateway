import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'images-url',
        data: { pageTitle: 'hmsgatewayApp.hmsmenuImagesUrl.home.title' },
        loadChildren: () => import('./hmsmenu/images-url/images-url.module').then(m => m.HmsmenuImagesUrlModule),
      },
      {
        path: 'contact-addresses',
        data: { pageTitle: 'hmsgatewayApp.hmscontactContactAddresses.home.title' },
        loadChildren: () => import('./hmscontact/contact-addresses/contact-addresses.module').then(m => m.HmscontactContactAddressesModule),
      },
      {
        path: 'customer-healths',
        data: { pageTitle: 'hmsgatewayApp.hmscustomerCustomerHealths.home.title' },
        loadChildren: () => import('./hmscustomer/customer-healths/customer-healths.module').then(m => m.HmscustomerCustomerHealthsModule),
      },
      {
        path: 'cook-orders',
        data: { pageTitle: 'hmsgatewayApp.hmskitchenCookOrders.home.title' },
        loadChildren: () => import('./hmskitchen/cook-orders/cook-orders.module').then(m => m.HmskitchenCookOrdersModule),
      },
      {
        path: 'nutriens',
        data: { pageTitle: 'hmsgatewayApp.hmsmenuNutriens.home.title' },
        loadChildren: () => import('./hmsmenu/nutriens/nutriens.module').then(m => m.HmsmenuNutriensModule),
      },
      {
        path: 'invoices',
        data: { pageTitle: 'hmsgatewayApp.hmsfinanceInvoices.home.title' },
        loadChildren: () => import('./hmsfinance/invoices/invoices.module').then(m => m.HmsfinanceInvoicesModule),
      },
      {
        path: 'items',
        data: { pageTitle: 'hmsgatewayApp.hmsfinanceItems.home.title' },
        loadChildren: () => import('./hmsfinance/items/items.module').then(m => m.HmsfinanceItemsModule),
      },
      {
        path: 'conditions',
        data: { pageTitle: 'hmsgatewayApp.hmsfinanceConditions.home.title' },
        loadChildren: () => import('./hmsfinance/conditions/conditions.module').then(m => m.HmsfinanceConditionsModule),
      },
      {
        path: 'invoice-transactions',
        data: { pageTitle: 'hmsgatewayApp.hmsfinanceInvoiceTransactions.home.title' },
        loadChildren: () =>
          import('./hmsfinance/invoice-transactions/invoice-transactions.module').then(m => m.HmsfinanceInvoiceTransactionsModule),
      },
      {
        path: 'template-items',
        data: { pageTitle: 'hmsgatewayApp.hmsfinanceTemplateItems.home.title' },
        loadChildren: () => import('./hmsfinance/template-items/template-items.module').then(m => m.HmsfinanceTemplateItemsModule),
      },
      {
        path: 'allergens',
        data: { pageTitle: 'hmsgatewayApp.hmscustomerAllergens.home.title' },
        loadChildren: () => import('./hmscustomer/allergens/allergens.module').then(m => m.HmscustomerAllergensModule),
      },
      {
        path: 'menu-groups',
        data: { pageTitle: 'hmsgatewayApp.hmsmenuMenuGroups.home.title' },
        loadChildren: () => import('./hmsmenu/menu-groups/menu-groups.module').then(m => m.HmsmenuMenuGroupsModule),
      },
      {
        path: 'delivery-transactions',
        data: { pageTitle: 'hmsgatewayApp.hmsdeliveryDeliveryTransactions.home.title' },
        loadChildren: () =>
          import('./hmsdelivery/delivery-transactions/delivery-transactions.module').then(m => m.HmsdeliveryDeliveryTransactionsModule),
      },
      {
        path: 'meals',
        data: { pageTitle: 'hmsgatewayApp.hmsmenuMeals.home.title' },
        loadChildren: () => import('./hmsmenu/meals/meals.module').then(m => m.HmsmenuMealsModule),
      },
      {
        path: 'templates',
        data: { pageTitle: 'hmsgatewayApp.hmsfinanceTemplates.home.title' },
        loadChildren: () => import('./hmsfinance/templates/templates.module').then(m => m.HmsfinanceTemplatesModule),
      },
      {
        path: 'condition-details',
        data: { pageTitle: 'hmsgatewayApp.hmsfinanceConditionDetails.home.title' },
        loadChildren: () => import('./hmsfinance/condition-details/condition-details.module').then(m => m.HmsfinanceConditionDetailsModule),
      },
      {
        path: 'ingredients',
        data: { pageTitle: 'hmsgatewayApp.hmsmenuIngredients.home.title' },
        loadChildren: () => import('./hmsmenu/ingredients/ingredients.module').then(m => m.HmsmenuIngredientsModule),
      },
      {
        path: 'payments',
        data: { pageTitle: 'hmsgatewayApp.hmsfinancePayments.home.title' },
        loadChildren: () => import('./hmsfinance/payments/payments.module').then(m => m.HmsfinancePaymentsModule),
      },
      {
        path: 'consultings',
        data: { pageTitle: 'hmsgatewayApp.hmsnutritionistConsultings.home.title' },
        loadChildren: () => import('./hmsnutritionist/consultings/consultings.module').then(m => m.HmsnutritionistConsultingsModule),
      },
      {
        path: 'sub-items',
        data: { pageTitle: 'hmsgatewayApp.hmsfinanceSubItems.home.title' },
        loadChildren: () => import('./hmsfinance/sub-items/sub-items.module').then(m => m.HmsfinanceSubItemsModule),
      },
      {
        path: 'recipies',
        data: { pageTitle: 'hmsgatewayApp.hmsmenuRecipies.home.title' },
        loadChildren: () => import('./hmsmenu/recipies/recipies.module').then(m => m.HmsmenuRecipiesModule),
      },
      {
        path: 'meal-ingredients',
        data: { pageTitle: 'hmsgatewayApp.hmsmenuMealIngredients.home.title' },
        loadChildren: () => import('./hmsmenu/meal-ingredients/meal-ingredients.module').then(m => m.HmsmenuMealIngredientsModule),
      },
      {
        path: 'invoice-details',
        data: { pageTitle: 'hmsgatewayApp.hmsfinanceInvoiceDetails.home.title' },
        loadChildren: () => import('./hmsfinance/invoice-details/invoice-details.module').then(m => m.HmsfinanceInvoiceDetailsModule),
      },
      {
        path: 'cook-transactions',
        data: { pageTitle: 'hmsgatewayApp.hmskitchenCookTransactions.home.title' },
        loadChildren: () => import('./hmskitchen/cook-transactions/cook-transactions.module').then(m => m.HmskitchenCookTransactionsModule),
      },
      {
        path: 'menus',
        data: { pageTitle: 'hmsgatewayApp.hmsmenuMenus.home.title' },
        loadChildren: () => import('./hmsmenu/menus/menus.module').then(m => m.HmsmenuMenusModule),
      },
      {
        path: 'delivery-orders',
        data: { pageTitle: 'hmsgatewayApp.hmsdeliveryDeliveryOrders.home.title' },
        loadChildren: () => import('./hmsdelivery/delivery-orders/delivery-orders.module').then(m => m.HmsdeliveryDeliveryOrdersModule),
      },
      {
        path: 'epicrysis',
        data: { pageTitle: 'hmsgatewayApp.hmsnutritionistEpicrysis.home.title' },
        loadChildren: () => import('./hmsnutritionist/epicrysis/epicrysis.module').then(m => m.HmsnutritionistEpicrysisModule),
      },
      {
        path: 'menu-suggestions',
        data: { pageTitle: 'hmsgatewayApp.hmsnutritionistMenuSuggestions.home.title' },
        loadChildren: () =>
          import('./hmsnutritionist/menu-suggestions/menu-suggestions.module').then(m => m.HmsnutritionistMenuSuggestionsModule),
      },
      {
        path: 'consulting-status',
        data: { pageTitle: 'hmsgatewayApp.hmsnutritionistConsultingStatus.home.title' },
        loadChildren: () =>
          import('./hmsnutritionist/consulting-status/consulting-status.module').then(m => m.HmsnutritionistConsultingStatusModule),
      },
      {
        path: 'contacts',
        data: { pageTitle: 'hmsgatewayApp.hmscontactContacts.home.title' },
        loadChildren: () => import('./hmscontact/contacts/contacts.module').then(m => m.HmscontactContactsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
