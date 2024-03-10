import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import {
  AdminCreateCommunityMemberInput,
  AdminFindManyCommunityMemberInput,
  CommunityMemberRole,
} from '@tokengator-mint/sdk'
import { useSdk } from '@tokengator-mint/web-core-data-access'
import { useState } from 'react'

export function useAdminFindManyCommunityMember(
  props: Partial<AdminFindManyCommunityMemberInput> & { communityId: string },
) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')
  const [role, setRole] = useState<CommunityMemberRole | undefined>(props?.role ?? undefined)
  const input: AdminFindManyCommunityMemberInput = { page, limit, search, communityId: props.communityId, role }
  const query = useQuery({
    queryKey: ['admin', 'find-many-community-member', input],
    queryFn: () => sdk.adminFindManyCommunityMember({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    role,
    setRole,
    setSearch,
    createCommunityMember: (input: AdminCreateCommunityMemberInput) =>
      sdk
        .adminCreateCommunityMember({ input: { ...input, communityId: props.communityId } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`CommunityMember created`)
          } else {
            toastError(`CommunityMember not created`)
          }
          return !!res.created
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    deleteCommunityMember: (communityMemberId: string) =>
      sdk.adminDeleteCommunityMember({ communityMemberId }).then(() => {
        toastSuccess('CommunityMember deleted')
        return query.refetch()
      }),
  }
}
