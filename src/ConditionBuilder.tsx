import { conditions } from '@nucypher/taco';
import { useEthers } from '@usedapp/core';
import React, { useState } from 'react';

interface Props {
  condition?: conditions.condition.Condition | undefined;
  setConditions: (value: conditions.condition.Condition) => void;
  enabled: boolean;
}

const rpcCondition = new conditions.base.jsonApi.JsonApiCondition({
  endpoint: 'https://arweave.net/wallet/:userAddress/balance',
  returnValueTest: {
    comparator: '>',
    value: 0,
  },
});
console.log("Requires Authentication:");
console.log(rpcCondition.requiresAuthentication());

export const ConditionBuilder = ({
  condition,
  setConditions,
  enabled,
}: Props) => {
  const { library } = useEthers();

  const demoCondition = JSON.stringify((condition ?? rpcCondition).toObj());
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
    JSON.stringify(rpcCondition.toObj()),
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
          <h3>Customize your Conditions</h3>
          <div>
            <h3>Condition JSON</h3>
            {conditionJSONInput}
          </div>
        </div>
        <button onClick={onCreateCondition}>Create Conditions</button>
      </div>
    </>
  );
};
