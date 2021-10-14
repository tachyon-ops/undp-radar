import React, { ChangeEventHandler, useEffect, useState } from 'react';

import { RadarUtilities } from '../../radar/utilities/RadarUtilities';
import { useDataState } from '../../stores/DataProvider';
import { useRadarState } from '../../stores/RadarProvider';
import { SelectableItem } from '../../types';

export const RawFilter: React.FC = () => {
  const {
    state: { blips, disasterTypeFilter, useCaseFilter },
    setUseCaseFilter,
    setDisasterTypeFilter
  } = useRadarState();

  const {
    state: { keys }
  } = useDataState();

  const [disasterTypes, setDisasterTypes] = useState<SelectableItem[]>([]);
  const [useCases, setUseCases] = useState<SelectableItem[]>([]);

  useEffect(() => {
    if (blips && blips?.length > 0) {
      const newUseCases = RadarUtilities.getUseCases(blips, keys.useCaseKey);
      setUseCases(newUseCases);

      const newDisasterTyes = RadarUtilities.getDisasterTypes(
        blips,
        keys.disasterTypeKey
      );
      setDisasterTypes(newDisasterTyes);
    }
  }, [blips]);

  const [selectedDisasterType, setSelectedDisasterType] = useState<string>(
    disasterTypeFilter === null ? 'all' : disasterTypeFilter
  );
  const [selectedUserCase, setSelectedUserCase] = useState<string>(
    useCaseFilter === null ? 'all' : useCaseFilter
  );
  const onDisasterTypeChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
    setSelectedDisasterType(e.target.value);
  const onUseCaseChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
    setSelectedUserCase(e.target.value);

  const onFilterHnalder = () => {
    // selected?
    setUseCaseFilter(selectedUserCase);
    setDisasterTypeFilter(selectedDisasterType);
  };

  return (
    <div
      style={{
        borderStyle: 'solid',
        borderTop: 'none',
        borderColor: 'lightgrey',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: 1,
        marginLeft: 2,
        marginRight: 2,
        padding: 20,
        paddingTop: 20,
        maxWidth: 300,
        backgroundColor: 'whitesmoke'
      }}
    >
      <div>Customize Radar</div>

      <div style={{ paddingTop: 20 }}>
        <select
          id='Select1'
          style={{ width: '100%' }}
          onChange={onDisasterTypeChange}
          value={selectedDisasterType}
        >
          <option value='all'>Show all countries</option>
          {disasterTypes.map((item) => (
            <option key={item.uuid} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ paddingTop: 20 }}>
        <select
          id='Select2'
          style={{ width: '100%' }}
          onChange={onUseCaseChange}
          value={selectedUserCase}
        >
          <option value='all'>Show all Use Cases</option>
          {useCases.map((item) => (
            <option key={item.uuid} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <small
        style={{
          padding: 10,
          fontSize: 10,
          textAlign: 'left',
          float: 'left',
          width: '100%'
        }}
      >
        todo: create filter generalization
      </small>

      <div style={{ paddingTop: 20 }}>
        <button
          type='button'
          style={{
            borderColor: 'lightgrey',
            borderWidth: 1,
            borderStyle: 'solid',
            padding: '10px 20px',
            backgroundColor: 'whitesmoke',
            cursor: 'pointer',
            borderRadius: 5
          }}
          onClick={onFilterHnalder}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
