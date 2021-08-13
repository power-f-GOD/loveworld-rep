import { StyleSheet } from 'react-native';
import { space, colors } from 'src/constants';

export const eventsStyles = StyleSheet.create({
  eventCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#eee',
    borderBottomColor: '#ddd',
    marginBottom: space.xs,
    backgroundColor: colors.white
  },
  cardTopTextContainer: {
    backgroundColor: colors.white,
    padding: 4
  },
  cardBannerWrapperTouchable: {
    flex: 1,
    flexGrow: 1
  },
  cardBannerWrapper: {
    width: space.lg + space.md,
    flex: 1
  },
  cardBanner: {
    flex: 1,
    height: '100%',
    flexGrow: 1,
    maxWidth: '100%',
    backgroundColor: 'white',
    borderColor: '#eee',
    width: '100%',
    alignSelf: 'stretch'
  },
  cardInfoWrapper: {
    padding: space.xs + 2,
    flex: 1
  },
  cardInfoIcon: { marginRight: 4, top: 2 },
  cardActions: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    flexDirection: 'row',
    marginTop: space.xs,
    paddingTop: space.xs * 0.75
  },
  cardActionsButtonWrapper: { alignItems: 'center' },
  cardActionsButton: {
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: 0
  }
});
