/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

import {BasePermission} from '../../modules/Permission';

/**
 * Define Permissions
 * @extends BasePermission
 * @class WorkspacePermission
 */
export class WorkspacePermission extends BasePermission {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'WorkspacePermission', scope);
  }
}