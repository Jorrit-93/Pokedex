import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      },
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'pokemon',
        children: [
          {
            path: '/:id',
            loadChildren: '../poke-detail/poke-detail.module#PokeDetailPageModule'
          },
          {
            path: '',
            loadChildren: '../poke-detail/poke-detail.module#PokeDetailPageModule'
          }
        ]
      },
      {
        path: 'catch',
        children: [
          {
            path: '/:id',
            loadChildren: '../poke-catch/poke-catch.module#PokeCatchPageModule'
          },
          {
            path: '',
            loadChildren: '../poke-catch/poke-catch.module#PokeCatchPageModule'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
