import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '../../coreView/common/table';
import ListBuilder from '../../coreView/common/list-builder';
import Modal from '../../coreView/common/modal';
import Input from '../../coreView/common/text-input';
import Select from '../../coreView/common/select-input';


export default function PMEnhancementView({containerState, itemState, appPrefs, onListLimitChange,
	onSearchChange, onSearchClick, onPaginationClick, onOrderBy, onOption, 
	closeModal, inputChange, goBack, session}) {

    let columns = [];
    if (itemState.prefLabels != null && itemState.prefLabels.PM_ENHANCEMENT_PAGE != null) {
    	columns = itemState.prefLabels.PM_ENHANCEMENT_PAGE;
    }
    let group = "TABLE1";
    
    let header = "";
    let parent = "";
    if (itemState.parent != null) {
		parent = itemState.parent.name;
    }
    
	if (itemState.prefTexts.PM_ENHANCEMENT_PAGE != null && itemState.prefTexts.PM_ENHANCEMENT_PAGE.PM_ENHANCEMENT_PAGE_HEADER != null) {
		header = itemState.prefTexts.PM_ENHANCEMENT_PAGE.PM_ENHANCEMENT_PAGE_HEADER.value;
	}
	
	if (goBack != null && parent != null && parent != "") {
		header = <div>{header} : <a onClick={() => goBack()} aria-hidden="true">{parent}</a></div>;
	}
	
	let deleteModalHeader = "Delete ";
	if (containerState.selected != null && containerState.selected.name != null) {
		deleteModalHeader += containerState.selected.name;
	}
	
	let viewPortSmall = false;
	if (session.viewPort === 'small') { viewPortSmall = true }
	
    return (
    	<div>
    		{viewPortSmall ? (
    			<ListBuilder
		  	      	containerState={containerState}
		  	      	header={header}
    				parent={parent}
		  	      	items={itemState.items}
		  	      	itemCount={itemState.itemCount}
		  	      	listStart={itemState.listStart}
		  	      	listLimit={itemState.listLimit}
		  	     	columns={columns}
		  	      	appPrefs={appPrefs}
		  	      	onListLimitChange={onListLimitChange}
		  	      	onSearchChange={onSearchChange}
		  	      	onSearchClick={onSearchClick}
		  	      	onPaginationClick={onPaginationClick}
		  			onOrderBy={onOrderBy}
	  				onOption={onOption}
		  			orderCriteria={itemState.orderCriteria}
	  				searchCriteria={itemState.searchCriteria}
		  	      />
    		) : (
	    		<Table
	    			containerState={containerState}
	    			header={header}
	    			parent={parent}
	    			items={itemState.items}
	    			itemCount={itemState.itemCount}
	    			listStart={itemState.listStart}
	    			listLimit={itemState.listLimit}
	    			columns={columns}
	    			labelGroup = {group}
	    			appPrefs={appPrefs}
	    			onListLimitChange={onListLimitChange}
	    			onSearchChange={onSearchChange}
	    			onSearchClick={onSearchClick}
	    			onPaginationClick={onPaginationClick}
	    			onOrderBy={onOrderBy}
	    			onOption={onOption}
	    			orderCriteria={itemState.orderCriteria}
					searchCriteria={itemState.searchCriteria}
	    		/>
    		)}
    		<Modal isOpen={containerState.isDeleteModalOpen} onClose={() => closeModal()} >
    			<div className="modal-dialog">
    				<div className="modal-content">
    					<div className="modal-header">
    						<button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"/></button>
    						<h4 className="modal-title">{deleteModalHeader}</h4>
    					</div>
    					<div className="modal-body">
    						<h3>Are you sure you want to delete?</h3>
    					</div>
    					<div className="modal-footer">
    						<button type="button" className="btn btn-primary" onClick={() => onOption("DELETEFINAL",containerState.selected)}>Delete</button>
    						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => closeModal()}>Close</button>
    					</div>
    				</div>
    			</div>
    		</Modal>
    	</div>
    );
}


PMEnhancementView.propTypes = {
  containerState: PropTypes.object,
  itemState: PropTypes.object,
  appPrefs: PropTypes.object,
  onListLimitChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSearchClick: PropTypes.func,
  onPaginationClick: PropTypes.func,
  onOrderBy: PropTypes.func, 
  openDeleteModal: PropTypes.func,
  closeModal: PropTypes.func,
  onOption: PropTypes.func,
  inputChange: PropTypes.func,
  goBack: PropTypes.func,
  session: PropTypes.object
};
