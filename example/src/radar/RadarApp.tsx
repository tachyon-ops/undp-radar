import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Radar, SelectionState } from 'undp-radar';

import { Layout } from '../layout/Layout';
import { LeftColumn } from '../layout/LeftColumn';
import { RightColumn } from '../layout/RightColumn';
import { CenterColumn } from '../layout/CenterColumn';
import { QuadrantPage } from '../components/quadrant/QuadrantPage';

const Filter = () => <div>Filter</div>;
const TechList = () => <div>TechList</div>;
const BlipPage = () => <div>BlipPage</div>;
const DataLists = () => <div>DataLists</div>;
const TechOrBlipDescription = () => <div>TechOrBlipDescription</div>;

export const RadarApp: React.FC = () => (
  <SelectionState>
    {({ selectedItem, selectedQuadrant }) => (
      <React.Fragment>
        <div className='App'>
          {!selectedQuadrant && !selectedItem && (
            <Layout>
              <LeftColumn>
                <Switch>
                  <Route exact path='/' component={TechList} />
                </Switch>

                <Switch>
                  <Route exact path='/' component={Filter} />
                </Switch>
              </LeftColumn>

              <CenterColumn>
                <Radar />
                <TechOrBlipDescription />
              </CenterColumn>

              <RightColumn>
                <DataLists />
              </RightColumn>
            </Layout>
          )}
          {!selectedQuadrant && selectedItem && <BlipPage />}
          {selectedQuadrant && <QuadrantPage />}
        </div>
      </React.Fragment>
    )}
  </SelectionState>
);
