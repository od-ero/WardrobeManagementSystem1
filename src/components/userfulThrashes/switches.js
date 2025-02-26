/*
import React from 'react'
import { handleFormInputChange, RadioInput } from '@/components/Floating_Form_input'

<div key={`role_div_${branch.value}`} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 border p-4 rounded-lg">
    {branch.roles.map((role) => (
            <React.Fragment key={`role_fragment_${role.value}`}>
                <RadioInput
                    id={`role_${role.value}`}
                    key={`role_radio_${role.value}`}
                    name={`branch_${branch.value}`}
                    input_label={role.label}
                    value={role.value}
                    checked={selectedBranchesWithRoles.some(
                        (item) => item.branch_id === branch.value && item.role_id === role.value
                    )}
                    onChange={(e) => {
                        handleRoleSelection(branch.value, role.value);
                        handleFormInputChange(e, setErrors);
                    }}
                    disabled={!selectedBranchesWithRoles.some((item) => item.branch_id === branch.value)}
                />
            </React.Fragment>
        ))}
</div>
*/
