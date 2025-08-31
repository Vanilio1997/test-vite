import * as styles from './Tabs.module.css';
import { FilterType } from '@/types';

interface ITabs {
    tabs: string[];
    activeTab: string;
    changeActiveTab: (tab: FilterType) => void;
}

const Tabs = ({ tabs, activeTab, changeActiveTab }: ITabs) => {
    console.log(tabs);
    
    return (
        <div className={styles.tabs} role="tablist">
            <div className={styles.tabsHeader}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        id={`tab-${index}`}
                        role="tab"
                        aria-selected={activeTab === tab}
                        aria-controls={`tabpanel-${index}`}
                        className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                        onClick={() => changeActiveTab(tab)}
                        onKeyDown={e => {
                            if (e.key === 'ArrowLeft') {
                                changeActiveTab(
                                    index > 0
                                        ? tabs[index - 1]
                                        : tabs[tabs.length - 1],
                                );
                            } else if (e.key === 'ArrowRight') {
                                changeActiveTab(
                                    index < tabs.length - 1
                                        ? tabs[index + 1]
                                        : tabs[0],
                                );
                            }
                        }}
                        tabIndex={activeTab === tab ? 0 : -1}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
