'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/common/button";
import { getActions, Action } from "@/lib/api";
import {getIconByName} from "@/utils/icon-map"; // Adjust the import path as needed

export function QuickActions() {
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    async function fetchActions() {
      const data = await getActions();
      setActions(data);
    }
    fetchActions();
  }, []);

  return (
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const IconComponent = getIconByName(action.iconName)
          return (
              <Button
                  key={action.id}
                  variant="outline"
                  className="h-24 flex-col gap-2"
                  onClick={() => console.log(`${action.label} clicked`)}
              >
                {IconComponent && <IconComponent className="h-6 w-6" />}
                {action.label}
              </Button>
          );
        })}
      </div>
  );
}
