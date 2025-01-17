import { ProcessTracker } from '@/common/components/molecules/ProcessTracker/ProcessTracker';
import { TWorkflowById } from '@/domains/workflows/fetchers';
import { cells } from '@/lib/blocks/create-blocks-typed/create-blocks-typed';
import { useWebsiteMonitoringReportBlock } from '@/lib/blocks/variants/WebsiteMonitoringBlocks/hooks/useWebsiteMonitoringReportBlock/useWebsiteMonitoringReportBlock';
import { useCasePlugins } from '@/pages/Entity/hooks/useCasePlugins/useCasePlugins';
import { useCurrentCaseQuery } from '@/pages/Entity/hooks/useCurrentCaseQuery/useCurrentCaseQuery';
import { BlocksComponent } from '@ballerine/blocks';

export const WebsiteMonitoringBlocks = () => {
  const blocks = useWebsiteMonitoringReportBlock();
  const { data: workflow } = useCurrentCaseQuery();
  const plugins = useCasePlugins({ workflow: workflow as TWorkflowById });
  const processes = ['merchant-monitoring'];

  return (
    <div className="flex h-full flex-col">
      {workflow?.workflowDefinition?.config?.isCaseOverviewEnabled && (
        <ProcessTracker workflow={workflow} plugins={plugins} processes={processes} />
      )}
      <BlocksComponent blocks={blocks} cells={cells}>
        {(Cell, cell) => <Cell {...cell} />}
      </BlocksComponent>
    </div>
  );
};
