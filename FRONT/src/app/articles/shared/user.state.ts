import { DtlUser } from './user.action';
import { UserStateModel } from './user.state.model';
import { Action, StateContext, State } from '@ngxs/store';

@State<UserStateModel>({
    name: 'user',
    defaults: {
        userId: 0
    }
})

export class UserState {

    @Action(DtlUser)
        dtl({getState, patchState}: StateContext<UserStateModel>, {payload} : DtlUser){
            patchState({ userId: payload });
        }
}