import { conditions } from '@nucypher/taco';
import { useEthers } from '@usedapp/core';
import React, { useState } from 'react';

interface Props {
  condition?: conditions.condition.Condition | undefined;
  setConditions: (value: conditions.condition.Condition) => void;
  enabled: boolean;
}

const jsonCondition = new conditions.base.jsonApi.JsonApiCondition({
  endpoint: 'https://arweave.net/info',
  query: '$.height',
  returnValueTest: {
    comparator: '>',
    value: 1556508,
  },
});
console.log("Requires Authentication:");
console.log(jsonCondition.requiresAuthentication());

export const ConditionBuilder = ({
  condition,
  setConditions,
  enabled,
}: Props) => {
  const { library } = useEthers();

  const demoCondition = JSON.stringify((condition ?? jsonCondition).toObj());
  const [conditionString, setConditionString] = useState(demoCondition);

  if (!enabled || !library) {
    return <></>;
  }

  const prettyPrint = (obj: object | string) => {
    if (typeof obj === 'string') {
      obj = JSON.parse(obj);
    }
    return JSON.stringify(obj, null, 2);
  };

  const makeInput = (
    onChange = (e: any) => console.log(e),
    defaultValue: string,
  ) => (
    <textarea
      rows={15}
      onChange={(e: any) => onChange(e.target.value)}
      defaultValue={prettyPrint(defaultValue)}
    >
      {}
    </textarea>
  );

  const conditionJSONInput = makeInput(
    setConditionString,
    JSON.stringify(jsonCondition.toObj()),
  );

  const onCreateCondition = (e: any) => {
    e.preventDefault();
    setConditions(
      conditions.ConditionFactory.conditionFromProps(
        JSON.parse(conditionString),
      ),
    );
  };

  return (
    <>
      <h2>Step 1 - Create A Conditioned Access Policy</h2>
      <div>
        <div>
          <h3>Customize your Conditions - try increasing the block height value</h3>
          <div>
            {conditionJSONInput}
          </div>
        </div>
        <button onClick={onCreateCondition}>Create Conditions</button>
      </div>
    </>
  );
};
